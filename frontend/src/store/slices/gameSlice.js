import { createSlice } from "@reduxjs/toolkit";

const initialGameSliceState = {
  teams: {
    orange: { name: "", capturedCells: [] },
    green: { name: "", capturedCells: [] },
  },
  isInitialized: false,
  board: [],
  currentTurn: "orange",
  phase: "picking",
  isAnswerRevealed: false,
  activeCell: null,
  activeQuestion: null,
  usedQuestionIds: [],
  winner: null,
  winBy: "", // path , captures
  answerMode: "text",
};

const gameSlice = createSlice({
  name: "game",
  initialState: initialGameSliceState,
  reducers: {
    setTeamNames(state, action) {
      state.teams.orange.name = action.payload.orangeTeamName;
      state.teams.green.name = action.payload.greenTeamName;
      state.isInitialized = true;
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
      console.log(action);
      state.board[action.payload.cellIndex].owner = action.payload.team;
    },
    addUsedQuestion(state, action) {
      state.usedQuestionIds.push(action.payload);
    },
    setWinner(state, action) {
      state.winner = action.payload;
    },
    setWinBy(state, action) {
      state.winBy = action.payload;
    },
    setAnswerMode(state, action) {
      state.answerMode = action.payload;
    },
    switchTurn(state) {
      state.currentTurn = state.currentTurn === "orange" ? "green" : "orange";
    },
    resetGame() {
      return { ...initialGameSliceState, board: [], usedQuestionIds: [] };
    },
    toggleIsAnswerRevealed(state, action) {
      state.isAnswerRevealed = action.payload;
    },
  },
});

export const gameActions = gameSlice.actions;
export default gameSlice.reducer;
