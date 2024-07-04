import React from 'react'

function Loader() {
    return (
        <div className="h-full w-full flex flex-row justify-between items-center content-center mx-auto">
            <button type="button" class="text-blue-400 bg-white p-1 rounded-md flex flex-row items-center content-center justify-evenly gap-1 mx-auto my-auto" disabled>
                <div className="h-[1.5rem] w-[1.5rem] rounded-[50%] border-[.2rem] border-t-blue-400 animate-spin"></div>
                loading...
            </button>
        </div>
    )
}

export default Loader