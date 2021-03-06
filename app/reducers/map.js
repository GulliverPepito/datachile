import { combineReducers } from "redux";

import { getAvailableYears } from "helpers/map";

const mapParamsInitialState = {
  cuts: {},
  isolate: { value: 0 },
  level: "comuna",
  measure: { value: "" },
  scale: "log",
  selector: {},
  topic: { value: "" },
  year: { region: 2016, comuna: 2016 }
};

const mapParamsReducer = (state = mapParamsInitialState, action) => {
  var newState, list, item;

  switch (action.type) {
    case "MAP_INIT":
      item = action.payload.params;
      const level = item.level || "comuna";
      return {
        ...state,
        topic: item.topic,
        measure: item.measure,
        level: level,
        scale: item.scale || "log",
        isolate: item.isolate || { value: 0 },
        year: { ...state.year, [level]: item.year || 2016 }
      };

    case "MAP_INIT_DEFERRED":
      return {
        ...state,
        cuts: action.payload.cuts,
        selector: action.payload.selector
      };

    case "MAP_CUT_ADD":
      item = action.payload;
      list = state.cuts[item.key] || [];
      return {
        ...state,
        cuts: {
          ...state.cuts,
          [item.key]: arrayUniqueAdd(list, item.member)
        }
      };

    case "MAP_CUT_REMOVE":
      item = action.payload;
      list = state.cuts[item.key] || [];
      return {
        ...state,
        cuts: {
          ...state.cuts,
          [item.key]: list.filter(cut => cut.name != item.name)
        }
      };

    case "MAP_ISOLATE_SET":
      return { ...state, isolate: action.payload };

    case "MAP_LEVEL_SET":
      return { ...state, level: action.payload, isolate: { value: 0 } };

    case "MAP_MEASURE_SET":
      return {
        ...state,
        measure: action.payload,
        selector: {},
        cuts: {}
      };

    case "MAP_SCALE_SET":
      return { ...state, scale: action.payload };

    case "MAP_SELECTOR_SET":
      item = action.payload;
      return {
        ...state,
        selector: {
          ...state.selector,
          [item.key]: item.level
        },
        cuts: {
          ...state.cuts,
          [item.key]: []
        }
      };

    case "MAP_TOPIC_SET":
      return {
        ...state,
        topic: action.payload,
        level: "comuna",
        selector: {},
        cuts: {}
      };

    case "MAP_YEAR_SET":
      return {
        ...state,
        year: {
          ...state.year,
          [state.level]: action.payload
        }
      };

    case "MAP_DATA_SUCCESS":
      return {
        ...state,
        year: {
          region: getAvailableYears(action.payload.dataRegion || []).pop(),
          comuna: getAvailableYears(action.payload.dataComuna || []).pop()
        }
      };

    default:
      return state;
  }
};

const mapOptionsInitialState = {
  status: "SUCCESS",
  countLoading: 0,
  countLoaded: 0,
  lastError: null,
  year: {
    region: [2015],
    comuna: [2015]
  },
  topic: [],
  cubes: [],
  regions: [
    { value: 15, name: "Arica y Parinacota" },
    { value: 1, name: "Tarapacá" },
    { value: 2, name: "Antofagasta" },
    { value: 3, name: "Atacama" },
    { value: 4, name: "Coquimbo" },
    { value: 5, name: "Valparaíso" },
    { value: 13, name: "Metropolitana" },
    { value: 6, name: "O'Higgins" },
    { value: 7, name: "Maule" },
    { value: 8, name: "Biobío" },
    { value: 9, name: "Araucanía" },
    { value: 14, name: "Los Ríos" },
    { value: 10, name: "Los Lagos" },
    { value: 11, name: "Aysén" },
    { value: 12, name: "Magallanes" }
  ],
  members: {}
};

const mapOptionsReducer = (state = mapOptionsInitialState, action) => {
  switch (action.type) {
    case "MAP_INIT":
      return { ...state, topic: action.payload.topics };

    case "MAP_MEMBER_FETCH":
      return { ...state, status: "LOADING", lastError: null };

    case "MAP_MEMBER_LOADING":
      return { ...state, countLoading: action.payload };

    case "MAP_MEMBER_LOADED":
      return { ...state, countLoaded: state.countLoaded + 1 };

    case "MAP_MEMBER_SUCCESS":
      const newState = {
        ...state,
        status: "SUCCESS",
        countLoading: 0,
        countLoaded: 0,
        lastError: null,
        cubes: [].concat(state.cubes, action.payload.cube),
        members: { ...state.members }
      };
      const levels = action.payload.levels;
      for (let level, i = 0; (level = levels[i]); i++) {
        newState.members[level.name] = level.members.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      }
      return newState;

    case "MAP_MEMBER_ERROR":
      return {
        ...state,
        status: "ERROR",
        lastError: action.payload,
        countLoading: 0,
        countLoaded: 0
      };

    case "MAP_DATA_SUCCESS":
      return {
        ...state,
        year: {
          region: getAvailableYears(action.payload.dataRegion || []),
          comuna: getAvailableYears(action.payload.dataComuna || [])
        }
      };
    default:
      return state;
  }
};

const mapDatasetReducer = (state = [], action) => {
  switch (action.type) {
    case "MAP_SAVE_DATASET":
      return [].concat(state, action.payload);

    case "MAP_DELETE_DATASET":
      return state.filter((item, index) => index !== action.index);

    default:
      return state;
  }
};

const mapResultInitialState = {
  status: "SUCCESS",
  lastError: null,
  data: { region: undefined, comuna: undefined },
  queries: { region: false, comuna: false }
};

const mapResultReducer = (state = mapResultInitialState, action) => {
  switch (action.type) {
    case "MAP_DATA_FETCH":
      return { ...state, status: "LOADING", lastError: null };

    case "MAP_DATA_SUCCESS":
      // this way I make sure the state keeps the shape
      return {
        status: "SUCCESS",
        lastError: null,
        queries: {
          region: action.payload.queryRegion || false,
          comuna: action.payload.queryComuna || false
        },
        data: {
          region: action.payload.dataRegion || undefined,
          comuna: action.payload.dataComuna || undefined
        }
      };

    case "MAP_DATA_ERROR":
      return {
        ...state,
        status: "ERROR",
        lastError: action.payload
      };

    default:
      return state;
  }
};

const mapTitleReducer = (state = "", action) => {
  switch (action.type) {
    case "MAP_SET_TITLE":
      return action.payload;

    default:
      return state;
  }
};

const mapPivotReducer = (state = "cols", action) => {
  switch (action.type) {
    case "MAP_PIVOT_SET":
      return action.payload;

    default:
      return state;
  }
};

const arrayUniqueAdd = (array, item) => {
  array = [].concat(array);
  if (item && !array.includes(item)) array.push(item);
  return array;
};

export default combineReducers({
  datasets: mapDatasetReducer,
  options: mapOptionsReducer,
  params: mapParamsReducer,
  results: mapResultReducer,
  title: mapTitleReducer,
  pivot: mapPivotReducer
});
