
export const SALTERN_SELECT = '@SALTERN/SALTERN_SELECT';

const salternselect= (saltern) =>{
    return (dispatch) =>{
        dispatch({
            type: SALTERN_SELECT,
            payload:{
                saltern
            }
        })
    }
}
export default salternselect;