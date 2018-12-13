# react-hook-router
Simple experimental browser router using react hooks

## Usage

```jsx
import React from 'react';
import useRouter from 'react-hook-router';

function MyApp(props) {
    const [routeState, setRouteState] = useRouter({
        // can be any shape
        initialState: {page: 'browse', category: 'furniture'}, 
        getUrlFromState: ({page, category, productId}) => {
            if (page === 'browse') {
                return `/browse/${category}/`;
            } else if (page === 'product') {
                return `/product/${productId}`;
            }
            return '/'; // home page
        getStateFromUrl: url => {
            const [,firstSegment, secondSegment] = url.split('/')
            if (firstSegment === 'browse') {
                return {page: 'browse', category: secondSegment};
            } else if (firstSegment === 'product') {
                return {page: 'product', productId: secondSegment};
            }
            return {page: 'home'};
    });

    switch (routeState.page) {
        case 'browse':
            return (
                <Browse 
                    category={routeState.category}
                    onViewProduct={(productId) => setRouteState({page: 'product', productId})}
                    onViewCategory={(category) => setRouteState({page: 'browse', category})}
                />
            );
        case 'product':
            return <Product productId={routeState.productId} />;
        case 'home':
        default:
            return (
                <Home 
                    onViewCategory={(category) => setRouteState({page: 'browse', category})}
                />
            );
    }
}

```