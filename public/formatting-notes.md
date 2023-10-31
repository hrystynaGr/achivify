### Organizing imports

1.  
    a. React import;  
    b. Imports from all *react related* libraries.  
2. Empty line
3. Imports from all not related to react exsternal libraries.
4. Empty line
5. Imports of:  
    a. `.css` files;  
    b. `context` files;  
    c. Import of functions, helper functions, outer classes;  
6. Empty line
7. Imports of components, images.

> In case of exporting more than two functions they should be orginized in column, otherwise - in-line.
```
import { loadUsersTimeStudied, loadUsersMilestones } from '../../helpers/user'; // inline
```
and
```
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate
} from 'react-router-dom'; // column
```

> Exeption: in case of importing functions from react, this line could remain inline with up to 3 items.
```
import React, { useState, useEffect } from 'react';
```

### Organazing .css

> Remember about DRY (Don't repeat yourself).

**Order of css rules**
1. **z-index**
1. **Layout:**    
a. display  
b. position   
c. align-items  
1. **Dimensions and box model:**    
a. width (min-width)  
b. height (min-height)  
a. margin  
b. padding  
c. border  
d. border-radius  
1. **Backgrounds:**    
a. box-shadow  
b. background  
3. **Typography:**    
a. font-size  
b. font-weight  
c. line-height  
d. text-transform  
e. white-space  
f. break-word  
1. **Interaction:**    
a. cursor  
b. transition  
c. animate  
1. **Other:**    
a. overflow  
b. pracity  

```
.card {
  position: relative;
  display: flex;

  width: 250px;
  height: 350px;
  margin: 5px 10px;
  padding: 10px;

  border: 1px solid #eee;
  border-radius: 5px;

  background: #fff;
  box-shadow: 5px 10px 18px #888888;

  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 18px;

  color: #111;
  text-align: left;
  letter-spacing: 1px;
  line-height: 20px;

  transition: transform(5px)
}
```

