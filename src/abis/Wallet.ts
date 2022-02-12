// example SmartWallet contract -- 0x36BdC410f3431b154d5a656A4B2790738c147942
export const Abi = [
  {
    inputs: [{ internalType: 'address', name: '_seed', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'to', type: 'address' },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
      { indexed: false, internalType: 'bytes', name: 'data', type: 'bytes' },
      {
        indexed: false,
        internalType: 'string',
        name: 'revertReason',
        type: 'string',
      },
    ],
    name: 'CallFailure',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bool',
        name: 'rolledBack',
        type: 'bool',
      },
      { indexed: false, internalType: 'address', name: 'to', type: 'address' },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
      { indexed: false, internalType: 'bytes', name: 'data', type: 'bytes' },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'returnData',
        type: 'bytes',
      },
    ],
    name: 'CallSuccess',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint96', name: 'value', type: 'uint96' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
        ],
        internalType: 'struct WalletInterface.Call[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: '_execute',
    outputs: [
      {
        components: [
          { internalType: 'bool', name: 'ok', type: 'bool' },
          { internalType: 'bytes', name: 'returnData', type: 'bytes' },
        ],
        internalType: 'struct WalletInterface.CallReturn[]',
        name: 'callResults',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint96', name: 'value', type: 'uint96' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
          {
            components: [
              {
                internalType: 'uint24',
                name: 'returnDataOffset',
                type: 'uint24',
              },
              { internalType: 'uint8', name: 'valueLength', type: 'uint8' },
              { internalType: 'uint16', name: 'callIndex', type: 'uint16' },
            ],
            internalType: 'struct WalletInterface.ValueReplacement[]',
            name: 'replaceValue',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'uint24',
                name: 'returnDataOffset',
                type: 'uint24',
              },
              { internalType: 'uint24', name: 'dataLength', type: 'uint24' },
              { internalType: 'uint16', name: 'callIndex', type: 'uint16' },
              {
                internalType: 'uint24',
                name: 'callDataOffset',
                type: 'uint24',
              },
            ],
            internalType: 'struct WalletInterface.DataReplacement[]',
            name: 'replaceData',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct WalletInterface.AdvancedCall[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: '_executeAdvanced',
    outputs: [
      {
        components: [
          { internalType: 'bool', name: 'ok', type: 'bool' },
          { internalType: 'bytes', name: 'returnData', type: 'bytes' },
          { internalType: 'uint96', name: 'callValue', type: 'uint96' },
          { internalType: 'bytes', name: 'callData', type: 'bytes' },
        ],
        internalType: 'struct WalletInterface.AdvancedCallReturn[]',
        name: 'callResults',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint96', name: 'value', type: 'uint96' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
        ],
        internalType: 'struct WalletInterface.Call[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: '_simulate',
    outputs: [
      {
        components: [
          { internalType: 'bool', name: 'ok', type: 'bool' },
          { internalType: 'bytes', name: 'returnData', type: 'bytes' },
        ],
        internalType: 'struct WalletInterface.CallReturn[]',
        name: 'callResults',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint96', name: 'value', type: 'uint96' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
          {
            components: [
              {
                internalType: 'uint24',
                name: 'returnDataOffset',
                type: 'uint24',
              },
              { internalType: 'uint8', name: 'valueLength', type: 'uint8' },
              { internalType: 'uint16', name: 'callIndex', type: 'uint16' },
            ],
            internalType: 'struct WalletInterface.ValueReplacement[]',
            name: 'replaceValue',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'uint24',
                name: 'returnDataOffset',
                type: 'uint24',
              },
              { internalType: 'uint24', name: 'dataLength', type: 'uint24' },
              { internalType: 'uint16', name: 'callIndex', type: 'uint16' },
              {
                internalType: 'uint24',
                name: 'callDataOffset',
                type: 'uint24',
              },
            ],
            internalType: 'struct WalletInterface.DataReplacement[]',
            name: 'replaceData',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct WalletInterface.AdvancedCall[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: '_simulateAdvanced',
    outputs: [
      {
        components: [
          { internalType: 'bool', name: 'ok', type: 'bool' },
          { internalType: 'bytes', name: 'returnData', type: 'bytes' },
          { internalType: 'uint96', name: 'callValue', type: 'uint96' },
          { internalType: 'bytes', name: 'callData', type: 'bytes' },
        ],
        internalType: 'struct WalletInterface.AdvancedCallReturn[]',
        name: 'callResults',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'cancelOwnershipTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'claimOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'claimerRegistry',
    outputs: [
      {
        internalType: 'contract WalletClaimerRegistryInterface',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint96', name: 'value', type: 'uint96' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
        ],
        internalType: 'struct WalletInterface.Call[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'execute',
    outputs: [
      { internalType: 'bool[]', name: 'ok', type: 'bool[]' },
      { internalType: 'bytes[]', name: 'returnData', type: 'bytes[]' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint96', name: 'value', type: 'uint96' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
          {
            components: [
              {
                internalType: 'uint24',
                name: 'returnDataOffset',
                type: 'uint24',
              },
              { internalType: 'uint8', name: 'valueLength', type: 'uint8' },
              { internalType: 'uint16', name: 'callIndex', type: 'uint16' },
            ],
            internalType: 'struct WalletInterface.ValueReplacement[]',
            name: 'replaceValue',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'uint24',
                name: 'returnDataOffset',
                type: 'uint24',
              },
              { internalType: 'uint24', name: 'dataLength', type: 'uint24' },
              { internalType: 'uint16', name: 'callIndex', type: 'uint16' },
              {
                internalType: 'uint24',
                name: 'callDataOffset',
                type: 'uint24',
              },
            ],
            internalType: 'struct WalletInterface.DataReplacement[]',
            name: 'replaceData',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct WalletInterface.AdvancedCall[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'executeAdvanced',
    outputs: [
      {
        components: [
          { internalType: 'bool', name: 'ok', type: 'bool' },
          { internalType: 'bytes', name: 'returnData', type: 'bytes' },
          { internalType: 'uint96', name: 'callValue', type: 'uint96' },
          { internalType: 'bytes', name: 'callData', type: 'bytes' },
        ],
        internalType: 'struct WalletInterface.AdvancedCallReturn[]',
        name: 'callResults',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'isOwner',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'seed',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint96', name: 'value', type: 'uint96' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
        ],
        internalType: 'struct WalletInterface.Call[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'simulate',
    outputs: [
      { internalType: 'bool[]', name: 'ok', type: 'bool[]' },
      { internalType: 'bytes[]', name: 'returnData', type: 'bytes[]' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint96', name: 'value', type: 'uint96' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
          {
            components: [
              {
                internalType: 'uint24',
                name: 'returnDataOffset',
                type: 'uint24',
              },
              { internalType: 'uint8', name: 'valueLength', type: 'uint8' },
              { internalType: 'uint16', name: 'callIndex', type: 'uint16' },
            ],
            internalType: 'struct WalletInterface.ValueReplacement[]',
            name: 'replaceValue',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'uint24',
                name: 'returnDataOffset',
                type: 'uint24',
              },
              { internalType: 'uint24', name: 'dataLength', type: 'uint24' },
              { internalType: 'uint16', name: 'callIndex', type: 'uint16' },
              {
                internalType: 'uint24',
                name: 'callDataOffset',
                type: 'uint24',
              },
            ],
            internalType: 'struct WalletInterface.DataReplacement[]',
            name: 'replaceData',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct WalletInterface.AdvancedCall[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'simulateAdvanced',
    outputs: [
      {
        components: [
          { internalType: 'bool', name: 'ok', type: 'bool' },
          { internalType: 'bytes', name: 'returnData', type: 'bytes' },
          { internalType: 'uint96', name: 'callValue', type: 'uint96' },
          { internalType: 'bytes', name: 'callData', type: 'bytes' },
        ],
        internalType: 'struct WalletInterface.AdvancedCallReturn[]',
        name: 'callResults',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  { stateMutability: 'payable', type: 'receive' },
]
