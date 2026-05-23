import { toast } from 'react-toastify';

export const confirmToast = ({
  message,
  description,
  confirmText = 'Yes',
  cancelText = 'No',
  confirmClass = 'btn-danger',
  onConfirm,
}) => {
  toast(
    ({ closeToast }) => (
      <div>
        <p className="mb-2">{message}</p>

        {description && <p className="text-muted small mb-3">{description}</p>}

        <div className="d-flex justify-content-end gap-2">
          <button
            className="btn btn-sm btn-secondary border-0"
            style={{ textTransform: 'none' }}
            onClick={closeToast}
          >
            {cancelText}
          </button>

          <button
            className={`btn btn-sm ${confirmClass} border-0`}
            onClick={() => {
              onConfirm();
              closeToast();
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    ),
    {
      autoClose: false,
      closeOnClick: false,
      draggable: false,
    }
  );
};
