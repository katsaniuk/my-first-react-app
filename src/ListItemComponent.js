const ListItemComponent = (props) => {
    return <>
        <li>{`${props.id} ${props.element}`}</li>
        {props.children}
    </>

}

export default ListItemComponent;
