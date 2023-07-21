import { USER } from '@/enum'
import { get, set, remove } from 'js-cookie'


function getToken () {
    return get(USER.TOKEN)
}

function setToken (token: string) {
    set(USER.TOKEN, token)
}

function removetToken () {
    remove(USER.TOKEN)
}


export function useToken () {

    return {
        getToken,
        setToken,
        removetToken
    }

}