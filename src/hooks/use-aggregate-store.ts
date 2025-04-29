import { create } from "zustand";
import { persist } from "zustand/middleware";

type SortOrder = "asc" | "desc";

interface FilterOptions {
  wardId?: string;
  areaCode?: string;
  enumeratorId?: string;
  mapStatus?: string;
  buildingOwnership?: string;
  buildingBase?: string;
  hasHouseholds?: boolean;
  hasBusinesses?: boolean;
  fromDate?: string;
  toDate?: string;
  searchTerm?: string;
}

interface PaginationState {
  limit: number;
  offset: number;
}

interface SortingState {
  sortBy: string;
  sortOrder: SortOrder;
}

interface ViewState {
  viewMode: "grid" | "table";
  expandedBuildings: Set<string>;
  expandedHouseholds: Set<string>;
  expandedBusinesses: Set<string>;
  selectedBuildingId: string | null;
  selectedHouseholdId: string | null;
  selectedBusinessId: string | null;
  showMedia: boolean;
}

interface AggregateStore {
  // Filter state
  filters: FilterOptions;
  setFilter: (
    key: keyof FilterOptions,
    value: string | boolean | undefined,
  ) => void;
  resetFilters: () => void;

  // Pagination state
  pagination: PaginationState;
  setPagination: (page: Partial<PaginationState>) => void;

  // Sorting state
  sorting: SortingState;
  setSorting: (sortBy: string, sortOrder?: SortOrder) => void;

  // View state
  view: ViewState;
  setViewMode: (mode: "grid" | "table") => void;
  toggleExpandedBuilding: (id: string) => void;
  toggleExpandedHousehold: (id: string) => void;
  toggleExpandedBusiness: (id: string) => void;
  setSelectedBuilding: (id: string | null) => void;
  setSelectedHousehold: (id: string | null) => void;
  setSelectedBusiness: (id: string | null) => void;
  toggleShowMedia: () => void;
}

export const useAggregateStore = create<AggregateStore>()(
  persist(
    (set) => ({
      // Filter state
      filters: {},
      setFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        })),
      resetFilters: () => set({ filters: {} }),

      // Pagination state
      pagination: {
        limit: 10,
        offset: 0,
      },
      setPagination: (page) =>
        set((state) => ({
          pagination: { ...state.pagination, ...page },
        })),

      // Sorting state
      sorting: {
        sortBy: "created_at",
        sortOrder: "desc",
      },
      setSorting: (sortBy, sortOrder = "asc") =>
        set({
          sorting: { sortBy, sortOrder },
        }),

      // View state
      view: {
        viewMode: "table",
        expandedBuildings: new Set<string>(),
        expandedHouseholds: new Set<string>(),
        expandedBusinesses: new Set<string>(),
        selectedBuildingId: null,
        selectedHouseholdId: null,
        selectedBusinessId: null,
        showMedia: true,
      },
      setViewMode: (mode) =>
        set((state) => ({
          view: { ...state.view, viewMode: mode },
        })),
      toggleExpandedBuilding: (id) =>
        set((state) => {
          const expandedBuildings = new Set(state.view.expandedBuildings);
          if (expandedBuildings.has(id)) {
            expandedBuildings.delete(id);
          } else {
            expandedBuildings.add(id);
          }
          return { view: { ...state.view, expandedBuildings } };
        }),
      toggleExpandedHousehold: (id) =>
        set((state) => {
          const expandedHouseholds = new Set(state.view.expandedHouseholds);
          if (expandedHouseholds.has(id)) {
            expandedHouseholds.delete(id);
          } else {
            expandedHouseholds.add(id);
          }
          return { view: { ...state.view, expandedHouseholds } };
        }),
      toggleExpandedBusiness: (id) =>
        set((state) => {
          const expandedBusinesses = new Set(state.view.expandedBusinesses);
          if (expandedBusinesses.has(id)) {
            expandedBusinesses.delete(id);
          } else {
            expandedBusinesses.add(id);
          }
          return { view: { ...state.view, expandedBusinesses } };
        }),
      setSelectedBuilding: (id) =>
        set((state) => ({
          view: { ...state.view, selectedBuildingId: id },
        })),
      setSelectedHousehold: (id) =>
        set((state) => ({
          view: { ...state.view, selectedHouseholdId: id },
        })),
      setSelectedBusiness: (id) =>
        set((state) => ({
          view: { ...state.view, selectedBusinessId: id },
        })),
      toggleShowMedia: () =>
        set((state) => ({
          view: { ...state.view, showMedia: !state.view.showMedia },
        })),
    }),
    {
      name: "aggregate-store",
      // Don't store view state
      partialize: (state) => ({
        filters: state.filters,
        pagination: state.pagination,
        sorting: state.sorting,
        view: {
          viewMode: state.view.viewMode,
          showMedia: state.view.showMedia,
        },
      }),
    },
  ),
);
