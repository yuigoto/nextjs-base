import { connect } from "react-redux";
import { CountDecrease, CountIncrease } from "state/ducks/Counter";
import { BaseProps } from "core/types";

interface IReduxCounter extends BaseProps {
  counter: any;
  counterIncrease: any;
  counterDecrease: any;
}

export const ReduxCounterWrapper = ({
  counter,
  counterIncrease,
  counterDecrease
}: IReduxCounter) => {
  return (
    <div className={"container"}>
      <div className={"row"}>
        <div className={"col-12"}>
          <h2 className={"display-1 text-center"}>
            {counter.count}
          </h2>
        </div>
        <div className={"col-12"}>
          <div className={"btn-group w-100 align-items-stretch justify-stretch"}>
            <button
              className={"text-center btn btn-danger"}
              onClick={() => counterDecrease()}
              style={{flex:1}}>
              <span className="display-4">-1</span>
            </button>
            <button
              className={"text-center btn btn-success"}
              onClick={() => counterIncrease()}
              style={{flex:1}}>
              <span className="display-4">+1</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapState = (state) => ({
  counter: state.counter
});

const mapDispatch = (dispatch) => ({
  counterIncrease: (value = 1) => {
    dispatch(CountIncrease(value));
  },
  counterDecrease: (value = -1) => {
    dispatch(CountDecrease(value));
  }
});

export const ReduxCounter = connect(mapState, mapDispatch)(ReduxCounterWrapper);
