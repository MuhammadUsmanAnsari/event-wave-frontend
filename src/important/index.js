import { toast } from 'react-toastify'
import LoadingBar from 'react-top-loading-bar';
window.getRandomId = () => Math.random().toString(36).slice(2);

window.toastify = (msg, type) => {
    switch (type) {
        case "success":
            toast.success(msg)
            break;
        case "error":
            toast.error(msg)
            break;
        case "info":
            toast.info(msg)
            break;
        case "warning":
            toast.warning(msg)
            break;
        default:
            toast(msg)
            break;
    }
}

window.loading = (progress) => {
    console.log(progress);
    <LoadingBar color="#000" progress={progress} onLoaderFinished={() => progress == 0} />
}
