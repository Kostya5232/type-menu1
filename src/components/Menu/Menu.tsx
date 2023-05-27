import { EPAGES } from '../../App';

interface IMenuProps {
  showMenuItem: Function
}

const Menu: React.FC<IMenuProps> = ({ showMenuItem }) => {
  return (
    <div className="menu">
      <button className="showMenuItem" onClick={() => showMenuItem(EPAGES.CALCULATOR)}>
        Калькулятор
      </button>
      <button className="showMenuItem" onClick={() => showMenuItem(EPAGES.GRAPH2D)}>
        2D График
      </button>
      <button className="showMenuItem" onClick={() => showMenuItem(EPAGES.GRAPH3D)}>
        3D График
      </button>
    </div>
  );
};

export default Menu;
