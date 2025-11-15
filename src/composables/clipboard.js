import {useToast} from "./toast.js";

export function useClipboard() {
    const toast = useToast()
    return ({
        writeText: async (text, message) => {
            try{
                await navigator.clipboard.writeText(text)
                toast.success(message ?? "Copied value to clipboard.")
            }catch(e){
                console.error(e)
                toast.error("Failed to copy to clipboard.")
            }
        },
    })
}