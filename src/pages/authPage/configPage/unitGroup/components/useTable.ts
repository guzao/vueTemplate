import { inject } from 'vue'
import { GroupUnitContextKey } from '../useUnitGroup'


export function useTable () {

    const groupUnitContext = inject(GroupUnitContextKey)!

    const expandChange = (row: any) => {
        console.log(row);
    }

    const editGroup = () => {
        console.log('editGroup');
        groupUnitContext.groupDrawerOpen()
    }

    const addGroup = () => {}

    const deletGroup = () => {
        console.log('deletGroup');
    }

    const editUint = () => {
        groupUnitContext.unitDrawerOpen()
    }

    const addUint = () => {
        groupUnitContext.unitDrawerOpen()
    }

const deltUint = () => {}

    return {
        editGroup,
        addGroup,
        deletGroup,
        editUint,
        addUint,
        deltUint,
        expandChange
    }

}