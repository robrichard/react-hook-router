const {useState, useEffect} = require('react');

function useRouter({ initialState, getPathFromState, getStateFromPath }) {
    const [state, baseSetState] = useState(initialState);

    function setState(newState) {
        baseSetState(newState);
        window.history.pushState({}, '', getPathFromState(newState));
    }

    useEffect(() => {
        const canonicalPathname = getPathFromState(state);
        if (window.location.pathname !== canonicalPathname) {
            window.history.replaceState({}, '', canonicalPathname);
        }
        
        function handleUrlChange() {
            setState(getStateFromPath(window.location.pathname));
        }

        window.addEventListener('popstate', handleUrlChange);        
        return () => {
            window.removeEventListener('popstate', handleUrlChange);
        }
    }, [state]);

    return [state, setState];
}