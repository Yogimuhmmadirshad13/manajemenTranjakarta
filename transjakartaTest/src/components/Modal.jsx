export default function Modal({ isOpen, onClose, children }) {
    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                className={`fixed inset-0 bg-black/30 transition-opacity ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`}
            />

            {/* Modal */}
            <div
                onClick={onClose}
                className={`fixed inset-0 flex items-center justify-center transition-opacity ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={`bg-white rounded-md shadow-lg p-6 max-w-lg w-full transition-transform ${isOpen ? "scale-100" : "scale-125 opacity-0"}`}
                >
                    {children}
                </div>
            </div>
        </>
    )
}
