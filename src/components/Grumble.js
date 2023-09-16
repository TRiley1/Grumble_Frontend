const Grumble = ({grumble}) => {
    return ( 
        <>
            <h2>{grumble.user.username}</h2>
            <p>{grumble.grumble}</p>
        </>
     );
}
 
export default Grumble;