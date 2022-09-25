const navbarSearchValue = () => {

    let value = "";

    return {
        set(newValue) {
            value = newValue;
        },

        get() {
            return value;
        }
        
    }

}

export default navbarSearchValue;