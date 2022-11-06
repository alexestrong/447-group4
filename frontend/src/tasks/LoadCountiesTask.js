import { default as data } from "../data/maryland-counties-coordinates.json"
class LoadCountiesTask{

    load = (setState) => {
        setState(data.features);
    };

}

export default LoadCountiesTask