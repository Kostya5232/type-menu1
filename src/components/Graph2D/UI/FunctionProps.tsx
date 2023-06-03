
import { IFuncs } from "../Graph2D";

interface IFunctionProps {
    func: IFuncs | null;
}

const FunctionProps: React.FC<IFunctionProps> = (props: IFunctionProps) => {
    const { func } = props;

    if (!func) {
        return (<></>);
    }

    return (<div>
        {/* ... */}
    </div>);
}

export default FunctionProps;