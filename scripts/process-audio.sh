#!/bin/bash

# Configuration
MINIO_ENDPOINT='minio-p4wwo448sowg8ck408gwgc08.intensivestudy.com.np'
MINIO_PORT=443
MINIO_ACCESS_KEY='R0E8K4U3I6SIZ2A2RC24'
MINIO_SECRET_KEY='+NXdeZ+VXW3+5nvFxL6JOHEOe0cXLZSfkjY8HJWw'
BUCKETS=("buddhashanti" "kerabari")

# Directory setup
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TEMP_DIR="${SCRIPT_DIR}/temp"
LOG_DIR="${SCRIPT_DIR}/logs"
PROCESSED_LOG="${LOG_DIR}/processed_files.txt"
ERROR_LOG="${LOG_DIR}/error_log.txt"

# Create required directories
mkdir -p "${TEMP_DIR}" "${LOG_DIR}"
touch "${PROCESSED_LOG}" "${ERROR_LOG}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Logging functions
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1" >> "${LOG_DIR}/process.log"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1" >> "${ERROR_LOG}"
}

# Check dependencies
for cmd in mc ffmpeg; do
    if ! command -v $cmd &> /dev/null; then
        error "$cmd is required but not installed. Please install it first."
        exit 1
    fi
done

# Configure mc
log "Configuring mc..."
mc alias set myminio "https://${MINIO_ENDPOINT}:${MINIO_PORT}" "${MINIO_ACCESS_KEY}" "${MINIO_SECRET_KEY}"

# Process file function
process_file() {
    local bucket=$1
    local file=$2
    local base_name=$(basename "$file")
    local temp_input="${TEMP_DIR}/${base_name}"
    local temp_output="${TEMP_DIR}/processed_${base_name}"
    
    # Check if file was already processed
    if grep -q "${bucket}/${file}" "${PROCESSED_LOG}"; then
        log "Skipping already processed file: ${bucket}/${file}"
        return
    }
    
    log "Processing: ${bucket}/${file}"
    
    # Download file
    if ! mc cp "myminio/${bucket}/${file}" "${temp_input}"; then
        error "Failed to download ${bucket}/${file}"
        return
    fi
    
    # Process with ffmpeg
    if ffmpeg -y -i "${temp_input}" -c:a aac -b:a 128k -ar 44100 -movflags +faststart "${temp_output}" 2>> "${ERROR_LOG}"; then
        # Upload processed file
        if mc cp "${temp_output}" "myminio/${bucket}/${file}"; then
            echo "${bucket}/${file}" >> "${PROCESSED_LOG}"
            log "Successfully processed and uploaded: ${bucket}/${file}"
        else
            error "Failed to upload processed file: ${bucket}/${file}"
        fi
    else
        error "Failed to process file: ${bucket}/${file}"
    fi
    
    # Cleanup
    rm -f "${temp_input}" "${temp_output}"
}

# Main processing loop
for bucket in "${BUCKETS[@]}"; do
    log "Processing bucket: ${bucket}"
    
    # List all .m4a files in the bucket
    mc ls --recursive "myminio/${bucket}" | grep '\.m4a$' | while read -r line; do
        file=$(echo "$line" | awk '{print $NF}')
        process_file "${bucket}" "${file}"
    done
done

log "Processing completed! Check logs at ${LOG_DIR}"
