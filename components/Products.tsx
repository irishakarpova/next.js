import { Product } from "../generated/frontend-graphql";
import TaskComponent from "./Product";
import style from "../styles/Home.module.css";

interface Props {
  tasks: Product[] | undefined;
}

const TasksList: React.FC<Props> = ({ tasks }) => {
  return (
    <div>
      <ul className={style.toursList}>
        {tasks &&
          tasks.map((task) => {
            return (
              <li key={task.id}>
                <TaskComponent task={task} />
              </li>
            );
          })}
      </ul>
    </div>
  );
};
export default TasksList;
