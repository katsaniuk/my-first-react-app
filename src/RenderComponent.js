import TodosList from "./TodosList";

const RenderComponent = () => {
    const toDos = [
        { id: 1, todo: 'firs todo' },
        { id: 2, todo: 'second todo' },
        { id: 3, todo: 'Three todo' },
        { id: 4, todo: 'fourth todo' }
    ]
    return <div>
        {toDos.map((item) => {
            return <TodosList key={item.id} todo={item.todo} />
        })}
    </div>
}

export default RenderComponent;
