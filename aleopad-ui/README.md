# Aleopad UI

React based DApp that provides UI for launch initiation, management and participation.

Source code structure is [Feature Sliced Design (FSD)](https://feature-sliced.design/) based.

Project uses react-query for rpc queries and wallet actions.

DApp uses 3 data sources:

- RPC from .env file for reading mappings data
- Haruka's Explorer API for listing launch and tokens mappings
- Demox Wallet Adapter for requesting records

All web3-related functions can be found in [Web3 package](./src/shared/web3/)

All pages can be found in [Pages folder](./src/pages/). [Routing](./src/pages/index.tsx)

All modals can be found in [Widgets folder](./src/widgets/)
