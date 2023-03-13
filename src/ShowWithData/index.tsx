import { ElementType } from 'react';

type IProps = {
    data: any;
    children?: ElementType | any;
};

function ShowWithData(props: IProps) {
    if (!props.data) {
        return null;
    }
    return props.children;
}

export default ShowWithData;
