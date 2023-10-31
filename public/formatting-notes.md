### Organizing imports

1. 
    A.  React import;
    A.  Imports from all *react related* libraries.
2. Empty line
3. Imports from all not related to react exsternal libraries.
4. Empty line
5. Imports of:
    A.  `.css` files;
    A.  `context` files;
    A.  Import of functions, helper functions, outer classes;
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