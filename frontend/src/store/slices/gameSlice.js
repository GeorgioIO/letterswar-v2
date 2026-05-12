import { createSlice } from "@reduxjs/toolkit";

const initialGameSliceState = {
  teams: {
    orange: { name: "", capturedCells: [] },
    green: { name: "", capturedCells: [] },
  },
  board: [],
  currentTurn: "orange",
  phase: "picking",
  activeCell: null,
  activeQuestion: null,
  usedQuestionIds: [],
  winner: null,
  answerMode: "text",
};

const gameSlice = createSlice({
  name: "game",
  initialState: initialGameSliceState,
  reducers: {
    setTeamNames(state, action) {
      state.teams.orange.name = action.payload.orangeTeamName;
      state.teams.green.name = action.payload.greenTeamName;
    },
    setBoard(state, action) {
      state.board = action.payload;
    },
    setPhase(state, action) {
      state.phase = action.payload;
    },
    setActiveCell(state, action) {
      state.activeCell = action.payload;
    },
    setActiveQuestion(state, action) {
      state.activeQuestion = action.payload;
    },
    captureCell(state, action) {
      state.board[action.payload.cellIndex].owner = action.payload.team;
    },
    addUsedQuestion(state, action) {
      state.usedQuestionIds.push(action.payload);
    },
    setWinner(state, action) {
      state.winner = action.payload;
    },
    setAnswerMode(state, action) {
      state.answerMode = action.payload;
    },
    switchTurn(state) {
      state.currentTurn = state.currentTurn === "orange" ? "green" : "orange";
    },
    resetGame(state) {
      return initialGameSliceState;
    },
  },
});

export const gameActions = gameSlice.actions;
export default gameSlice.reducer;
