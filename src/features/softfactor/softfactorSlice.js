import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getSoftFactors,
  getQuestionsBySoftFactorId,
  postAnswer,
  updateSoftFactor,
  postSF,
  deleteSFAPI,
  updateQuestionAPI,
  postQuestionAPI,
  getAnswersbyUsername,
  deleteQuestionAPI,
} from "./softfactorAPI";

const initialState = {
  loading: false,
  answersLoading: false,
  processing: false,
  softFactors: [],
  questions: [],
  answers: [],
  selectedSoftFactor: null,
  selectedQuestion: null,
  softFactor: "",
  questionsAnswered: false,
  message: null,
  error: null,
};

const defaultErrorMsg = "Something went wrong! Please try again later.";

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const addSF = createAsyncThunk("softfactor/addSF", async (params) => {
  const response = await postSF(params.newSoftFactor);
  return { status: response.status, data: await response.json() };
});

export const getSF = createAsyncThunk("softfactor/getSF", async (thunkAPI) => {
  const response = await getSoftFactors();
  return { status: response.status, data: await response.json() };
});

export const updateSF = createAsyncThunk(
  "softFactor/updateSF",
  async (params) => {
    const response = await updateSoftFactor(
      params.id,
      params.updatedSoftFactor
    );
    return { status: response.status, data: await response.json() };
  }
);

export const deleteSF = createAsyncThunk(
  "softfactor/deleteSF",
  async (params) => {
    console.log(params.id);
    const response = await deleteSFAPI(params.id);
    return { status: response.status, data: await response.json() };
  }
);

export const answerPost = createAsyncThunk(
  "softfactor/answerPost",
  async (params, thunkAPI) => {
    const response = await postAnswer(params.answers);
    return { status: response.status, data: await response.json() };
  }
);

export const addQuestion = createAsyncThunk(
  "question/addQuestion",
  async (params) => {
    const response = await postQuestionAPI(params.newQuestion);
    return { status: response.status, data: await response.json() };
  }
);

export const getQuestionsBySFId = createAsyncThunk(
  "softfactor/getQuestionsBySFId",
  async (params, thunkAPI) => {
    const response = await getQuestionsBySoftFactorId(params.id);
    return { status: response.status, data: await response.json() };
  }
);

export const updateQuestion = createAsyncThunk(
  "questions/updateQuestion",
  async (params) => {
    const response = await updateQuestionAPI(params.id, params.updatedQuestion);
    return { status: response.status, data: await response.json() };
  }
);

export const getSFAnswersByUsername = createAsyncThunk(
  "softfactor/getSFAnswersByUsername",
  async (username, thunkAPI) => {
    const response = await getAnswersbyUsername(username);
    return { status: response.status, data: await response.json() };
  }
);

export const deleteQuestion = createAsyncThunk(
  "softfactor/deleteQuestion",
  async (params) => {
    console.log(params.id);
    const response = await deleteQuestionAPI(params.id);
    return { status: response.status, data: await response.json() };
  }
);

export const softfactorSlice = createSlice({
  name: "softfactor",
  initialState,
  reducers: {
    selectedSoftFactor(state, action) {
      state.selectedSoftFactor = action.payload;
    },
    selectQuestion(state, action) {
      console.log(action.payload);
      state.selectedQuestion = action.payload;
    },
    clearQuestionsList(state) {
      state.questions = null;
    },
    clearSoftFactorState(state) {
      state.loading = false;
      state.softFactors = [];
      state.questions = [];
      state.answers = [];
      state.answersLoading = false;
      state.questionsAnswered = false;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(addSF.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(addSF.fulfilled, (state, action) => {
        const payload = action.payload;
        console.log(payload);
        if (payload.status === 200) {
          state.message = payload.data.message;
          state.softFactors = [...state.softFactors, payload.data.item];
        } else state.error = payload.data.message;
        state.loading = false;
      })
      .addCase(addSF.rejected, (state) => {
        state.error = defaultErrorMsg;
        state.loading = false;
      });
    builder
      .addCase(getSF.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(getSF.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload.status === 200) {
          state.softFactors = payload.data.item;
          state.message = payload.data.message;
        } else state.error = payload.data.message;
        state.loading = false;
      })
      .addCase(getSF.rejected, (state) => {
        state.error = defaultErrorMsg;
        state.loading = false;
      });
    builder
      .addCase(updateSF.pending, (state) => {
        state.processing = true;
        state.error = null;
        state.message = null;
      })
      .addCase(updateSF.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload.status === 200) {
          state.softFactors = [
            ...state.softFactors.map((element) => {
              if (element.id !== payload.data.item.id) {
                // This isn't the item we care about - keep it as-is
                return element;
              }
              // Otherwise, this is the one we want - return an updated value
              return {
                ...element,
                ...payload.data.item,
              };
            }),
          ];
        } else state.error = defaultErrorMsg;
        state.processing = false;
        state.selectedSoftFactor = null;
      })
      .addCase(updateSF.rejected, (state) => {
        state.message = null;
        state.error = defaultErrorMsg;
        state.processing = false;
      });
    builder
      .addCase(answerPost.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(answerPost.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload.status === 200) {
          state.questionsAnswered = true;
          state.message = payload.data.message;
          state.loading = false;
        } else {
          state.error = payload.data.message;
        }
        state.loading = false;
      })
      .addCase(answerPost.rejected, (state) => {
        state.error = defaultErrorMsg;
        state.loading = false;
      });
    builder
      .addCase(getQuestionsBySFId.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(getQuestionsBySFId.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload.status === 200) {
          state.questions = payload.data.item;
          state.test = payload.data.item;
          state.message = payload.data.message;
        } else state.error = payload.data.message;
        state.loading = false;
      })
      .addCase(getQuestionsBySFId.rejected, (state) => {
        state.error = defaultErrorMsg;
        state.loading = false;
      });

    builder
      .addCase(updateQuestion.pending, (state) => {
        state.processing = true;
        state.error = null;
        state.message = null;
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        const payload = action.payload;
        console.log(payload);
        if (payload.status === 200) {
          state.questions = [
            ...state.questions.map((element) => {
              if (element.id !== payload.data.item.id) {
                // This isn't the item we care about - keep it as-is
                return element;
              }
              // Otherwise, this is the one we want - return an updated value
              return {
                ...element,
                ...payload.data.item,
              };
            }),
          ];
        } else state.error = payload.data.message;
        state.processing = false;
        state.selectedSoftFactor = null;
      })
      .addCase(updateQuestion.rejected, (state) => {
        state.error = defaultErrorMsg;
        state.processing = false;
      });

    builder
      .addCase(getSFAnswersByUsername.pending, (state) => {
        state.answersLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(getSFAnswersByUsername.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload.status === 200) {
          state.answers = payload.data.item;
        } else {
          state.error = action.payload.message;
        }
        state.answersLoading = false;
      })
      .addCase(getSFAnswersByUsername.rejected, (state) => {
        state.error = defaultErrorMsg;
        state.answersLoading = false;
      });

    builder
      .addCase(addQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        const payload = action.payload;
        console.log(payload);
        if (payload.status === 200) {
          state.questions = [...state.questions, payload.data.item];
        } else {
          state.error = defaultErrorMsg;
        }
        state.loading = false;
      })
      .addCase(addQuestion.rejected, (state) => {
        state.error = defaultErrorMsg;
        state.loading = false;
      });
    builder
      .addCase(deleteSF.pending, (state) => {
        state.processing = true;
        state.error = null;
        state.message = null;
      })
      .addCase(deleteSF.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload.status === 200) {
          state.softFactors = [
            ...state.softFactors.filter((element) => {
              return element.id !== state.selectedSoftFactor.id;
            }),
          ];
        } else state.error = defaultErrorMsg;
        state.processing = false;
        state.selectedSoftFactor = null;
      })
      .addCase(deleteSF.rejected, (state) => {
        state.message = null;
        state.error = defaultErrorMsg;
        state.processing = false;
      });
    builder
      .addCase(deleteQuestion.pending, (state) => {
        state.processing = true;
        state.error = null;
        state.message = null;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload.status === 200) {
          console.log(payload.data);
          console.log(state.selectedQuestion.content);
          state.questions = [
            ...state.questions.filter((element) => {
              return element.content !== state.selectedQuestion.content;
            }),
          ];
        } else state.error = defaultErrorMsg;
        state.processing = false;
        state.selectedQuestion = null;
      })
      .addCase(deleteQuestion.rejected, (state) => {
        state.message = null;
        state.error = defaultErrorMsg;
        state.processing = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  clearSoftFactorState,
  clearQuestionsList,
  selectedSoftFactor,
  selectQuestion,
} = softfactorSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectLoading = (state) => state.softfactor.loading;
export const selectSelectedSF = (state) => state.softfactor.selectedSoftFactor;
export const selectSFProcessing = (state) => state.softfactor.processing;
export const selectSelectedQ = (state) => state.softfactor.selectedQuestion;
export const selectSoftFactors = (state) => state.softfactor.softFactors;
export const selectQuestions = (state) => state.softfactor.questions;
export const selectQuestionsAnswered = (state) =>
  state.softfactor.questionsAnswered;
export const selectMessage = (state) => state.softfactor.message;
export const selectError = (state) => state.softfactor.error;
export const postMessage = (state) => state.softfactor.message;
export const selectAnswersLoading = (state) => state.softfactor.answersLoading;
export const selectAnswers = (state) => state.softfactor.answers;

export default softfactorSlice.reducer;
