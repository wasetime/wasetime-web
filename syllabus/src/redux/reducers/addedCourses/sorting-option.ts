import { CHANGE_COURSES_SORTING_OPTION } from "../../actions/types";

interface PayloadProps {
  sortingOption: string;
}

interface ActionProps {
  type: string;
  payload: PayloadProps;
}

const sortingOption = (state = "ADDED_ORDER", action: ActionProps): string =>
  action.type === CHANGE_COURSES_SORTING_OPTION
    ? action.payload.sortingOption
    : state;

export default sortingOption;
