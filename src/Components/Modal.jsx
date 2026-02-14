import ReactDOM from 'react-dom'

export default function Modal({children, handleModalClose}) {
    return ReactDOM.createPortal(
        <div className="modal-container">
            <button className="modal-underlay" onClick={()=> handleModalClose()} />
            <div className="modal-content">
                {children}
            </div>
        </div>,
        document.getElementById('portal')
    )
}                                                                                