import { Component, createRef, Fragment } from 'react';

interface AppState {
    datasetPath: string;
    drawings: Drawing[];
    numDrawings: number;
    drawingsIndex: number;
}

class App extends Component<any, AppState> {
    viewContainerRef: React.RefObject<HTMLDivElement>;
    constructor(props: any) {
        super(props);
        this.viewContainerRef = createRef<HTMLDivElement>();
        this.state = {
            datasetPath: null,
            drawings: [],
            numDrawings: 10,
            drawingsIndex: 0
        } as AppState;
        this.openDataset = this.openDataset.bind(this);
        this.numPerPageChange = this.numPerPageChange.bind(this);
    }

    render() {
        const sliceStart = this.state.drawingsIndex * this.state.numDrawings;
        const sliceEnd = sliceStart + this.state.numDrawings;
        const drawingSlice = this.state.drawings.slice(sliceStart, sliceEnd);
        const drawings = drawingSlice.map((drawing) =>
            <div key={drawing.key_id}><DrawingDisplay drawing={drawing}></DrawingDisplay></div>
        );
        const fileName = this.state.datasetPath?.split('\\').at(-1);
        return(<Fragment>
            <CssBaseline />
        </Fragment>);
    }
}

export default App;