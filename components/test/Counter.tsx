import { FunctionComponent } from "react";
import { connect } from "react-redux";
import { IBaseProps } from "core/interfaces";
import { CountDecrease, CountIncrease } from "state/ducks/Test";

interface ICounter extends IBaseProps {
  count?: number;
  counterIncrease?: Function;
  counterDecrease?: Function;
}

const CounterTemplate: FunctionComponent<ICounter> = ({
  count,
  counterDecrease,
  counterIncrease
}) => {
  return (
    <>
      <h3 className={"text-center"}>
        Contador com Redux: {count}
      </h3>
      
      <p className={"text-center"}>
        <button className={"btn"} onClick={() => counterDecrease()}>
          -1
        </button>
        &nbsp;
        &nbsp;
        &nbsp;
        <button className={"btn"} onClick={() => counterIncrease()}>
          +1
        </button>
      </p>
    </>
  );
};

const mapState = (state) => ({
  count: state.test.count
});

const mapDispatch = (dispatch) => ({
  counterIncrease: () => {
    dispatch(CountIncrease());
  },
  counterDecrease: () => {
    dispatch(CountDecrease());
  }
});

export const Counter = connect(mapState, mapDispatch)(CounterTemplate);
