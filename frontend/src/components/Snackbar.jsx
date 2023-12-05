export const Snackbar = ({ errorMessage, statusError }) => {
    return (
        <div className={`py-4 px-8 border rounded-lg shadow-md ${statusError === "error" ? "bg-red-500" : "bg-yellow-500"} text-white mb-6`}>
            <h2 className="text-xl font-bold">Attention!</h2>
            <p className="mb-4">{errorMessage}</p>
            {/* <ul className="list-disc list-inside">
                <li>Il campo "nome" deve essere compilato.</li>
                <li>Il campo "email" deve contenere un indirizzo email valido.</li>
            </ul> */}
        </div>
    )
}