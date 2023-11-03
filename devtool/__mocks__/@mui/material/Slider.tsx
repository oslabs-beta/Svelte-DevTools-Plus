// Mock MUI slider. When clicked it updates to snapshot #2
export default function Slider(props: any) {
  function handleClick() {
    props.onChange(null, 2);
    props.onChangeCommitted(null, 2);
  }
  return (
    <div data-testid="rewinder-slider" onClick={handleClick}>
      slideee
    </div>
  );
}
