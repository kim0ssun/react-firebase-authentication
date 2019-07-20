import React from 'react';

import { FirebaseContext } from '../Firebase';

const Landing = () => {
    return ( 
        <FirebaseContext.Consumer>
            {firebase => {
                return <div>firebase 액세스 성공!!!</div>
            }}
        </FirebaseContext.Consumer>
     );
}
 
export default Landing;