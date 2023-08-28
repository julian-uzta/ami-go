export const LabeledInput = ({label, updateValue}: {label: string, updateValue: Function}) => {
  return (
    <div className="form-control pb-2">
      <label className="input-group input-group-sm">
        <span className="w-1/3 h-12">{label}</span>
        <input type="number" min="0" key={label}
          className="input input-bordered input-sm w-2/3 h-12"
          onChange={event => { updateValue(event.currentTarget.value)}}
        />
      </label>
    </div>
  )
};