const Title = ({name}) => {
    return(
        <div className="row bg-wp rounded bg-white mb-3">
            <div className="col p-5 rounded shadow">
                <div className="title-content mb-4">
                    <h2>{name}</h2>
                </div>
            </div>
        </div>
    );
}

export default Title;