import { toast } from 'react-toastify'
// import { FaTimesCircle, FaCheckCircle, FaInfoCircle } from 'react-icons/fa'

export function toastCustom (description, state, timeAutoclose, position) {
  const renderData = () => {
    return (
      <div className='container_toast'>
        {
        state === 'error'
          ? (
              null
            )
          : state === 'success'
            ? (
                null
              )
            : (
                null
              )
      }
        <p>{description}</p>
      </div>
    )
  }

  const params = {
    position: position,
    autoClose: timeAutoclose,
    hideProgressBar: true,
    closeOnClick: true,
    draggable: true,
    progress: undefined
  }

  state === 'error'
    ? (
        toast.error(renderData(), params)
      )
    : state === 'success'
      ? (
          toast.success(renderData(), params)
        )
      : (
          toast.warning(renderData(), params)
        )
}
