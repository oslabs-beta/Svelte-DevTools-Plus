const mockData = {
  id: 25,
  type: 'component',
  tagName: 'App',
  children: [
    {
      id: 24,
      type: 'component',
      tagName: 'Board',
      children: [
        {
          id: 6,
          type: 'component',
          tagName: 'Row',
          children: [
            {
              id: 0,
              type: 'component',
              tagName: 'Box',
              children: [],
              uniqueId: 'faef8535-e7fa-4a8a-832f-faecf1724124',
              detail: {
                attributes: [
                  { key: 'boxState', value: '-', isBound: false },
                  {
                    key: 'handleClick',
                    value: {
                      __isFunction: true,
                      source:
                        "function handleClick(x, y) {\n    \t\tif (state[x][y] !== '-') return;\n    \t\tif (gameOver) return;\n    \t\tturnCount++;\n\n    \t\tif (turnCount === 9) {\n    \t\t\t$$invalidate(2, gameOver = true);\n    \t\t\tsetWinner('draw');\n    \t\t}\n\n    \t\t$$invalidate(1, state[x][y] = turn, state);\n    \t\tconst test = [];\n\n    \t\tfor (let x = 0; x < state.length; x++) {\n    \t\t\tfor (let y = 0; y < state[0].length; y++) {\n    \t\t\t\ttest.push(state[x][y]);\n    \t\t\t}\n    \t\t}\n\n    \t\twinningConditions.forEach(c => {\n    \t\t\tif (test[c[0]] === test[c[1]] && test[c[1]] === test[c[2]] && test[c[0]] === test[c[2]] && test[c[0]] !== '-') {\n    \t\t\t\t$$invalidate(2, gameOver = true);\n    \t\t\t\tsetWinner(turn);\n    \t\t\t}\n    \t\t});\n\n    \t\tturn = turn === 'X' ? 'O' : 'X';\n    \t}",
                      name: 'handleClick',
                    },
                    isBound: false,
                  },
                  { key: 'rowIndex', value: 0, isBound: false },
                  { key: 'boxIndex', value: 0, isBound: false },
                ],
                listeners: [],
                ctx: [{ key: 'state', value: '' }],
              },
            },
            {
              id: 2,
              type: 'component',
              tagName: 'Box',
              children: [],
              uniqueId: 'a8dcffe9-1273-49f2-8cf7-1508319d1e4c',
              detail: {
                attributes: [
                  { key: 'boxState', value: '-', isBound: false },
                  {
                    key: 'handleClick',
                    value: {
                      __isFunction: true,
                      source:
                        "function handleClick(x, y) {\n    \t\tif (state[x][y] !== '-') return;\n    \t\tif (gameOver) return;\n    \t\tturnCount++;\n\n    \t\tif (turnCount === 9) {\n    \t\t\t$$invalidate(2, gameOver = true);\n    \t\t\tsetWinner('draw');\n    \t\t}\n\n    \t\t$$invalidate(1, state[x][y] = turn, state);\n    \t\tconst test = [];\n\n    \t\tfor (let x = 0; x < state.length; x++) {\n    \t\t\tfor (let y = 0; y < state[0].length; y++) {\n    \t\t\t\ttest.push(state[x][y]);\n    \t\t\t}\n    \t\t}\n\n    \t\twinningConditions.forEach(c => {\n    \t\t\tif (test[c[0]] === test[c[1]] && test[c[1]] === test[c[2]] && test[c[0]] === test[c[2]] && test[c[0]] !== '-') {\n    \t\t\t\t$$invalidate(2, gameOver = true);\n    \t\t\t\tsetWinner(turn);\n    \t\t\t}\n    \t\t});\n\n    \t\tturn = turn === 'X' ? 'O' : 'X';\n    \t}",
                      name: 'handleClick',
                    },
                    isBound: false,
                  },
                  { key: 'rowIndex', value: 0, isBound: false },
                  { key: 'boxIndex', value: 1, isBound: false },
                ],
                listeners: [],
                ctx: [{ key: 'state', value: '' }],
              },
            },
            {
              id: 4,
              type: 'component',
              tagName: 'Box',
              children: [],
              uniqueId: 'b1901591-323d-4ce3-a160-cea89b23bfc7',
              detail: {
                attributes: [
                  { key: 'boxState', value: '-', isBound: false },
                  {
                    key: 'handleClick',
                    value: {
                      __isFunction: true,
                      source:
                        "function handleClick(x, y) {\n    \t\tif (state[x][y] !== '-') return;\n    \t\tif (gameOver) return;\n    \t\tturnCount++;\n\n    \t\tif (turnCount === 9) {\n    \t\t\t$$invalidate(2, gameOver = true);\n    \t\t\tsetWinner('draw');\n    \t\t}\n\n    \t\t$$invalidate(1, state[x][y] = turn, state);\n    \t\tconst test = [];\n\n    \t\tfor (let x = 0; x < state.length; x++) {\n    \t\t\tfor (let y = 0; y < state[0].length; y++) {\n    \t\t\t\ttest.push(state[x][y]);\n    \t\t\t}\n    \t\t}\n\n    \t\twinningConditions.forEach(c => {\n    \t\t\tif (test[c[0]] === test[c[1]] && test[c[1]] === test[c[2]] && test[c[0]] === test[c[2]] && test[c[0]] !== '-') {\n    \t\t\t\t$$invalidate(2, gameOver = true);\n    \t\t\t\tsetWinner(turn);\n    \t\t\t}\n    \t\t});\n\n    \t\tturn = turn === 'X' ? 'O' : 'X';\n    \t}",
                      name: 'handleClick',
                    },
                    isBound: false,
                  },
                  { key: 'rowIndex', value: 0, isBound: false },
                  { key: 'boxIndex', value: 2, isBound: false },
                ],
                listeners: [],
                ctx: [{ key: 'state', value: '' }],
              },
            },
          ],
          uniqueId: '947723d8-17a2-4675-8fac-f08fe576a1f8',
          detail: {
            attributes: [
              { key: 'rowState', value: ['-', '-', '-'], isBound: false },
              {
                key: 'handleClick',
                value: {
                  __isFunction: true,
                  source:
                    "function handleClick(x, y) {\n    \t\tif (state[x][y] !== '-') return;\n    \t\tif (gameOver) return;\n    \t\tturnCount++;\n\n    \t\tif (turnCount === 9) {\n    \t\t\t$$invalidate(2, gameOver = true);\n    \t\t\tsetWinner('draw');\n    \t\t}\n\n    \t\t$$invalidate(1, state[x][y] = turn, state);\n    \t\tconst test = [];\n\n    \t\tfor (let x = 0; x < state.length; x++) {\n    \t\t\tfor (let y = 0; y < state[0].length; y++) {\n    \t\t\t\ttest.push(state[x][y]);\n    \t\t\t}\n    \t\t}\n\n    \t\twinningConditions.forEach(c => {\n    \t\t\tif (test[c[0]] === test[c[1]] && test[c[1]] === test[c[2]] && test[c[0]] === test[c[2]] && test[c[0]] !== '-') {\n    \t\t\t\t$$invalidate(2, gameOver = true);\n    \t\t\t\tsetWinner(turn);\n    \t\t\t}\n    \t\t});\n\n    \t\tturn = turn === 'X' ? 'O' : 'X';\n    \t}",
                  name: 'handleClick',
                },
                isBound: false,
              },
              { key: 'rowIndex', value: 0, isBound: false },
            ],
            listeners: [],
            ctx: [
              {
                key: 'Box',
                value: {
                  __isFunction: true,
                  source:
                    "class Box extends SvelteComponentDev {\n    \tconstructor(options) {\n    \t\tsuper(options);\n\n    \t\tinit(this, options, instance$4, create_fragment$4, safe_not_equal, {\n    \t\t\tboxState: 0,\n    \t\t\thandleClick: 1,\n    \t\t\trowIndex: 2,\n    \t\t\tboxIndex: 3\n    \t\t});\n\n    \t\tdispatch_dev(\"SvelteRegisterComponent\", {\n    \t\t\tcomponent: this,\n    \t\t\ttagName: \"Box\",\n    \t\t\toptions,\n    \t\t\tid: create_fragment$4.name\n    \t\t});\n    \t}\n\n    \tget boxState() {\n    \t\tthrow new Error(\"<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'\");\n    \t}\n\n    \tset boxState(value) {\n    \t\tthrow new Error(\"<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'\");\n    \t}\n\n    \tget handleClick() {\n    \t\tthrow new Error(\"<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'\");\n    \t}\n\n    \tset handleClick(value) {\n    \t\tthrow new Error(\"<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'\");\n    \t}\n\n    \tget rowIndex() {\n    \t\tthrow new Error(\"<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'\");\n    \t}\n\n    \tset rowIndex(value) {\n    \t\tthrow new Error(\"<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'\");\n    \t}\n\n    \tget boxIndex() {\n    \t\tthrow new Error(\"<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'\");\n    \t}\n\n    \tset boxIndex(value) {\n    \t\tthrow new Error(\"<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'\");\n    \t}\n    }",
                  name: 'Box',
                },
              },
              { key: 'stateeee', value: '' },
            ],
          },
        },
        {
          id: 14,
          type: 'component',
          tagName: 'Row',
          children: [
            {
              id: 8,
              type: 'component',
              tagName: 'Box',
              children: [],
              uniqueId: '66eb066a-7a1f-422b-8bb8-1615d707f03c',
              detail: {
                attributes: [
                  { key: 'boxState', value: '-', isBound: false },
                  {
                    key: 'handleClick',
                    value: {
                      __isFunction: true,
                      source:
                        "function handleClick(x, y) {\n    \t\tif (state[x][y] !== '-') return;\n    \t\tif (gameOver) return;\n    \t\tturnCount++;\n\n    \t\tif (turnCount === 9) {\n    \t\t\t$$invalidate(2, gameOver = true);\n    \t\t\tsetWinner('draw');\n    \t\t}\n\n    \t\t$$invalidate(1, state[x][y] = turn, state);\n    \t\tconst test = [];\n\n    \t\tfor (let x = 0; x < state.length; x++) {\n    \t\t\tfor (let y = 0; y < state[0].length; y++) {\n    \t\t\t\ttest.push(state[x][y]);\n    \t\t\t}\n    \t\t}\n\n    \t\twinningConditions.forEach(c => {\n    \t\t\tif (test[c[0]] === test[c[1]] && test[c[1]] === test[c[2]] && test[c[0]] === test[c[2]] && test[c[0]] !== '-') {\n    \t\t\t\t$$invalidate(2, gameOver = true);\n    \t\t\t\tsetWinner(turn);\n    \t\t\t}\n    \t\t});\n\n    \t\tturn = turn === 'X' ? 'O' : 'X';\n    \t}",
                      name: 'handleClick',
                    },
                    isBound: false,
                  },
                  { key: 'rowIndex', value: 1, isBound: false },
                  { key: 'boxIndex', value: 0, isBound: false },
                ],
                listeners: [],
                ctx: [{ key: 'state', value: '' }],
              },
            },
            {
              id: 10,
              type: 'component',
              tagName: 'Box',
              children: [],
              uniqueId: '5b093c95-ba4e-4aa8-bdc0-1b0c6434fd34',
              detail: {
                attributes: [
                  { key: 'boxState', value: '-', isBound: false },
                  {
                    key: 'handleClick',
                    value: {
                      __isFunction: true,
                      source:
                        "function handleClick(x, y) {\n    \t\tif (state[x][y] !== '-') return;\n    \t\tif (gameOver) return;\n    \t\tturnCount++;\n\n    \t\tif (turnCount === 9) {\n    \t\t\t$$invalidate(2, gameOver = true);\n    \t\t\tsetWinner('draw');\n    \t\t}\n\n    \t\t$$invalidate(1, state[x][y] = turn, state);\n    \t\tconst test = [];\n\n    \t\tfor (let x = 0; x < state.length; x++) {\n    \t\t\tfor (let y = 0; y < state[0].length; y++) {\n    \t\t\t\ttest.push(state[x][y]);\n    \t\t\t}\n    \t\t}\n\n    \t\twinningConditions.forEach(c => {\n    \t\t\tif (test[c[0]] === test[c[1]] && test[c[1]] === test[c[2]] && test[c[0]] === test[c[2]] && test[c[0]] !== '-') {\n    \t\t\t\t$$invalidate(2, gameOver = true);\n    \t\t\t\tsetWinner(turn);\n    \t\t\t}\n    \t\t});\n\n    \t\tturn = turn === 'X' ? 'O' : 'X';\n    \t}",
                      name: 'handleClick',
                    },
                    isBound: false,
                  },
                  { key: 'rowIndex', value: 1, isBound: false },
                  { key: 'boxIndex', value: 1, isBound: false },
                ],
                listeners: [],
                ctx: [{ key: 'state', value: '' }],
              },
            },
            {
              id: 12,
              type: 'component',
              tagName: 'Box',
              children: [],
              uniqueId: 'cc782013-3636-4ee2-9b5c-64b1eeee3f31',
              detail: {
                attributes: [
                  { key: 'boxState', value: '-', isBound: false },
                  {
                    key: 'handleClick',
                    value: {
                      __isFunction: true,
                      source:
                        "function handleClick(x, y) {\n    \t\tif (state[x][y] !== '-') return;\n    \t\tif (gameOver) return;\n    \t\tturnCount++;\n\n    \t\tif (turnCount === 9) {\n    \t\t\t$$invalidate(2, gameOver = true);\n    \t\t\tsetWinner('draw');\n    \t\t}\n\n    \t\t$$invalidate(1, state[x][y] = turn, state);\n    \t\tconst test = [];\n\n    \t\tfor (let x = 0; x < state.length; x++) {\n    \t\t\tfor (let y = 0; y < state[0].length; y++) {\n    \t\t\t\ttest.push(state[x][y]);\n    \t\t\t}\n    \t\t}\n\n    \t\twinningConditions.forEach(c => {\n    \t\t\tif (test[c[0]] === test[c[1]] && test[c[1]] === test[c[2]] && test[c[0]] === test[c[2]] && test[c[0]] !== '-') {\n    \t\t\t\t$$invalidate(2, gameOver = true);\n    \t\t\t\tsetWinner(turn);\n    \t\t\t}\n    \t\t});\n\n    \t\tturn = turn === 'X' ? 'O' : 'X';\n    \t}",
                      name: 'handleClick',
                    },
                    isBound: false,
                  },
                  { key: 'rowIndex', value: 1, isBound: false },
                  { key: 'boxIndex', value: 2, isBound: false },
                ],
                listeners: [],
                ctx: [{ key: 'state', value: '' }],
              },
            },
          ],
          uniqueId: '03de3bc5-07d3-4eaf-8896-3598dc50e340',
          detail: {
            attributes: [
              { key: 'rowState', value: ['-', '-', '-'], isBound: false },
              {
                key: 'handleClick',
                value: {
                  __isFunction: true,
                  source:
                    "function handleClick(x, y) {\n    \t\tif (state[x][y] !== '-') return;\n    \t\tif (gameOver) return;\n    \t\tturnCount++;\n\n    \t\tif (turnCount === 9) {\n    \t\t\t$$invalidate(2, gameOver = true);\n    \t\t\tsetWinner('draw');\n    \t\t}\n\n    \t\t$$invalidate(1, state[x][y] = turn, state);\n    \t\tconst test = [];\n\n    \t\tfor (let x = 0; x < state.length; x++) {\n    \t\t\tfor (let y = 0; y < state[0].length; y++) {\n    \t\t\t\ttest.push(state[x][y]);\n    \t\t\t}\n    \t\t}\n\n    \t\twinningConditions.forEach(c => {\n    \t\t\tif (test[c[0]] === test[c[1]] && test[c[1]] === test[c[2]] && test[c[0]] === test[c[2]] && test[c[0]] !== '-') {\n    \t\t\t\t$$invalidate(2, gameOver = true);\n    \t\t\t\tsetWinner(turn);\n    \t\t\t}\n    \t\t});\n\n    \t\tturn = turn === 'X' ? 'O' : 'X';\n    \t}",
                  name: 'handleClick',
                },
                isBound: false,
              },
              { key: 'rowIndex', value: 1, isBound: false },
            ],
            listeners: [],
            ctx: [
              {
                key: 'Box',
                value: {
                  __isFunction: true,
                  source:
                    "class Box extends SvelteComponentDev {\n    \tconstructor(options) {\n    \t\tsuper(options);\n\n    \t\tinit(this, options, instance$4, create_fragment$4, safe_not_equal, {\n    \t\t\tboxState: 0,\n    \t\t\thandleClick: 1,\n    \t\t\trowIndex: 2,\n    \t\t\tboxIndex: 3\n    \t\t});\n\n    \t\tdispatch_dev(\"SvelteRegisterComponent\", {\n    \t\t\tcomponent: this,\n    \t\t\ttagName: \"Box\",\n    \t\t\toptions,\n    \t\t\tid: create_fragment$4.name\n    \t\t});\n    \t}\n\n    \tget boxState() {\n    \t\tthrow new Error(\"<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'\");\n    \t}\n\n    \tset boxState(value) {\n    \t\tthrow new Error(\"<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'\");\n    \t}\n\n    \tget handleClick() {\n    \t\tthrow new Error(\"<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'\");\n    \t}\n\n    \tset handleClick(value) {\n    \t\tthrow new Error(\"<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'\");\n    \t}\n\n    \tget rowIndex() {\n    \t\tthrow new Error(\"<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'\");\n    \t}\n\n    \tset rowIndex(value) {\n    \t\tthrow new Error(\"<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'\");\n    \t}\n\n    \tget boxIndex() {\n    \t\tthrow new Error(\"<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'\");\n    \t}\n\n    \tset boxIndex(value) {\n    \t\tthrow new Error(\"<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'\");\n    \t}\n    }",
                  name: 'Box',
                },
              },
              { key: 'stateeee', value: '' },
            ],
          },
        },
        {
          id: 22,
          type: 'component',
          tagName: 'Row',
          children: [
            {
              id: 16,
              type: 'component',
              tagName: 'Box',
              children: [],
              uniqueId: '9200e5fc-a392-4c2e-b96a-2edc11e57642',
              detail: {
                attributes: [
                  { key: 'boxState', value: '-', isBound: false },
                  {
                    key: 'handleClick',
                    value: {
                      __isFunction: true,
                      source:
                        "function handleClick(x, y) {\n    \t\tif (state[x][y] !== '-') return;\n    \t\tif (gameOver) return;\n    \t\tturnCount++;\n\n    \t\tif (turnCount === 9) {\n    \t\t\t$$invalidate(2, gameOver = true);\n    \t\t\tsetWinner('draw');\n    \t\t}\n\n    \t\t$$invalidate(1, state[x][y] = turn, state);\n    \t\tconst test = [];\n\n    \t\tfor (let x = 0; x < state.length; x++) {\n    \t\t\tfor (let y = 0; y < state[0].length; y++) {\n    \t\t\t\ttest.push(state[x][y]);\n    \t\t\t}\n    \t\t}\n\n    \t\twinningConditions.forEach(c => {\n    \t\t\tif (test[c[0]] === test[c[1]] && test[c[1]] === test[c[2]] && test[c[0]] === test[c[2]] && test[c[0]] !== '-') {\n    \t\t\t\t$$invalidate(2, gameOver = true);\n    \t\t\t\tsetWinner(turn);\n    \t\t\t}\n    \t\t});\n\n    \t\tturn = turn === 'X' ? 'O' : 'X';\n    \t}",
                      name: 'handleClick',
                    },
                    isBound: false,
                  },
                  { key: 'rowIndex', value: 2, isBound: false },
                  { key: 'boxIndex', value: 0, isBound: false },
                ],
                listeners: [],
                ctx: [{ key: 'state', value: '' }],
              },
            },
            {
              id: 18,
              type: 'component',
              tagName: 'Box',
              children: [],
              uniqueId: 'fbf7e047-02d3-4539-8c31-b9da4a8bac97',
              detail: {
                attributes: [
                  { key: 'boxState', value: '-', isBound: false },
                  {
                    key: 'handleClick',
                    value: {
                      __isFunction: true,
                      source:
                        "function handleClick(x, y) {\n    \t\tif (state[x][y] !== '-') return;\n    \t\tif (gameOver) return;\n    \t\tturnCount++;\n\n    \t\tif (turnCount === 9) {\n    \t\t\t$$invalidate(2, gameOver = true);\n    \t\t\tsetWinner('draw');\n    \t\t}\n\n    \t\t$$invalidate(1, state[x][y] = turn, state);\n    \t\tconst test = [];\n\n    \t\tfor (let x = 0; x < state.length; x++) {\n    \t\t\tfor (let y = 0; y < state[0].length; y++) {\n    \t\t\t\ttest.push(state[x][y]);\n    \t\t\t}\n    \t\t}\n\n    \t\twinningConditions.forEach(c => {\n    \t\t\tif (test[c[0]] === test[c[1]] && test[c[1]] === test[c[2]] && test[c[0]] === test[c[2]] && test[c[0]] !== '-') {\n    \t\t\t\t$$invalidate(2, gameOver = true);\n    \t\t\t\tsetWinner(turn);\n    \t\t\t}\n    \t\t});\n\n    \t\tturn = turn === 'X' ? 'O' : 'X';\n    \t}",
                      name: 'handleClick',
                    },
                    isBound: false,
                  },
                  { key: 'rowIndex', value: 2, isBound: false },
                  { key: 'boxIndex', value: 1, isBound: false },
                ],
                listeners: [],
                ctx: [{ key: 'state', value: '' }],
              },
            },
            {
              id: 20,
              type: 'component',
              tagName: 'Box',
              children: [],
              uniqueId: 'b44c43b6-5379-4ddc-9c24-a11e4b5f13bb',
              detail: {
                attributes: [
                  { key: 'boxState', value: '-', isBound: false },
                  {
                    key: 'handleClick',
                    value: {
                      __isFunction: true,
                      source:
                        "function handleClick(x, y) {\n    \t\tif (state[x][y] !== '-') return;\n    \t\tif (gameOver) return;\n    \t\tturnCount++;\n\n    \t\tif (turnCount === 9) {\n    \t\t\t$$invalidate(2, gameOver = true);\n    \t\t\tsetWinner('draw');\n    \t\t}\n\n    \t\t$$invalidate(1, state[x][y] = turn, state);\n    \t\tconst test = [];\n\n    \t\tfor (let x = 0; x < state.length; x++) {\n    \t\t\tfor (let y = 0; y < state[0].length; y++) {\n    \t\t\t\ttest.push(state[x][y]);\n    \t\t\t}\n    \t\t}\n\n    \t\twinningConditions.forEach(c => {\n    \t\t\tif (test[c[0]] === test[c[1]] && test[c[1]] === test[c[2]] && test[c[0]] === test[c[2]] && test[c[0]] !== '-') {\n    \t\t\t\t$$invalidate(2, gameOver = true);\n    \t\t\t\tsetWinner(turn);\n    \t\t\t}\n    \t\t});\n\n    \t\tturn = turn === 'X' ? 'O' : 'X';\n    \t}",
                      name: 'handleClick',
                    },
                    isBound: false,
                  },
                  { key: 'rowIndex', value: 2, isBound: false },
                  { key: 'boxIndex', value: 2, isBound: false },
                ],
                listeners: [],
                ctx: [{ key: 'state', value: '' }],
              },
            },
          ],
          uniqueId: '2f461a45-1a16-4a3a-aa5e-05f7f9af7e2c',
          detail: {
            attributes: [
              { key: 'rowState', value: ['-', '-', '-'], isBound: false },
              {
                key: 'handleClick',
                value: {
                  __isFunction: true,
                  source:
                    "function handleClick(x, y) {\n    \t\tif (state[x][y] !== '-') return;\n    \t\tif (gameOver) return;\n    \t\tturnCount++;\n\n    \t\tif (turnCount === 9) {\n    \t\t\t$$invalidate(2, gameOver = true);\n    \t\t\tsetWinner('draw');\n    \t\t}\n\n    \t\t$$invalidate(1, state[x][y] = turn, state);\n    \t\tconst test = [];\n\n    \t\tfor (let x = 0; x < state.length; x++) {\n    \t\t\tfor (let y = 0; y < state[0].length; y++) {\n    \t\t\t\ttest.push(state[x][y]);\n    \t\t\t}\n    \t\t}\n\n    \t\twinningConditions.forEach(c => {\n    \t\t\tif (test[c[0]] === test[c[1]] && test[c[1]] === test[c[2]] && test[c[0]] === test[c[2]] && test[c[0]] !== '-') {\n    \t\t\t\t$$invalidate(2, gameOver = true);\n    \t\t\t\tsetWinner(turn);\n    \t\t\t}\n    \t\t});\n\n    \t\tturn = turn === 'X' ? 'O' : 'X';\n    \t}",
                  name: 'handleClick',
                },
                isBound: false,
              },
              { key: 'rowIndex', value: 2, isBound: false },
            ],
            listeners: [],
            ctx: [
              {
                key: 'Box',
                value: {
                  __isFunction: true,
                  source:
                    "class Box extends SvelteComponentDev {\n    \tconstructor(options) {\n    \t\tsuper(options);\n\n    \t\tinit(this, options, instance$4, create_fragment$4, safe_not_equal, {\n    \t\t\tboxState: 0,\n    \t\t\thandleClick: 1,\n    \t\t\trowIndex: 2,\n    \t\t\tboxIndex: 3\n    \t\t});\n\n    \t\tdispatch_dev(\"SvelteRegisterComponent\", {\n    \t\t\tcomponent: this,\n    \t\t\ttagName: \"Box\",\n    \t\t\toptions,\n    \t\t\tid: create_fragment$4.name\n    \t\t});\n    \t}\n\n    \tget boxState() {\n    \t\tthrow new Error(\"<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'\");\n    \t}\n\n    \tset boxState(value) {\n    \t\tthrow new Error(\"<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'\");\n    \t}\n\n    \tget handleClick() {\n    \t\tthrow new Error(\"<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'\");\n    \t}\n\n    \tset handleClick(value) {\n    \t\tthrow new Error(\"<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'\");\n    \t}\n\n    \tget rowIndex() {\n    \t\tthrow new Error(\"<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'\");\n    \t}\n\n    \tset rowIndex(value) {\n    \t\tthrow new Error(\"<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'\");\n    \t}\n\n    \tget boxIndex() {\n    \t\tthrow new Error(\"<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'\");\n    \t}\n\n    \tset boxIndex(value) {\n    \t\tthrow new Error(\"<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'\");\n    \t}\n    }",
                  name: 'Box',
                },
              },
              { key: 'stateeee', value: '' },
            ],
          },
        },
      ],
      uniqueId: 'e108844f-699c-4e45-9004-441496b0d856',
      detail: {
        attributes: [
          {
            key: 'handleClick',
            value: {
              __isFunction: true,
              source:
                "function handleClick(x, y) {\n    \t\tif (state[x][y] !== '-') return;\n    \t\tif (gameOver) return;\n    \t\tturnCount++;\n\n    \t\tif (turnCount === 9) {\n    \t\t\t$$invalidate(2, gameOver = true);\n    \t\t\tsetWinner('draw');\n    \t\t}\n\n    \t\t$$invalidate(1, state[x][y] = turn, state);\n    \t\tconst test = [];\n\n    \t\tfor (let x = 0; x < state.length; x++) {\n    \t\t\tfor (let y = 0; y < state[0].length; y++) {\n    \t\t\t\ttest.push(state[x][y]);\n    \t\t\t}\n    \t\t}\n\n    \t\twinningConditions.forEach(c => {\n    \t\t\tif (test[c[0]] === test[c[1]] && test[c[1]] === test[c[2]] && test[c[0]] === test[c[2]] && test[c[0]] !== '-') {\n    \t\t\t\t$$invalidate(2, gameOver = true);\n    \t\t\t\tsetWinner(turn);\n    \t\t\t}\n    \t\t});\n\n    \t\tturn = turn === 'X' ? 'O' : 'X';\n    \t}",
              name: 'handleClick',
            },
            isBound: false,
          },
        ],
        listeners: [],
        ctx: [
          {
            key: 'Row',
            value: {
              __isFunction: true,
              source:
                "class Row extends SvelteComponentDev {\n    \tconstructor(options) {\n    \t\tsuper(options);\n    \t\tinit(this, options, instance$3, create_fragment$3, safe_not_equal, { rowState: 0, handleClick: 1, rowIndex: 2 });\n\n    \t\tdispatch_dev(\"SvelteRegisterComponent\", {\n    \t\t\tcomponent: this,\n    \t\t\ttagName: \"Row\",\n    \t\t\toptions,\n    \t\t\tid: create_fragment$3.name\n    \t\t});\n    \t}\n\n    \tget rowState() {\n    \t\tthrow new Error(\"<Row>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'\");\n    \t}\n\n    \tset rowState(value) {\n    \t\tthrow new Error(\"<Row>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'\");\n    \t}\n\n    \tget handleClick() {\n    \t\tthrow new Error(\"<Row>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'\");\n    \t}\n\n    \tset handleClick(value) {\n    \t\tthrow new Error(\"<Row>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'\");\n    \t}\n\n    \tget rowIndex() {\n    \t\tthrow new Error(\"<Row>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'\");\n    \t}\n\n    \tset rowIndex(value) {\n    \t\tthrow new Error(\"<Row>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'\");\n    \t}\n    }",
              name: 'Row',
            },
          },
          {
            key: 'WinnerMessage',
            value: {
              __isFunction: true,
              source:
                'class WinnerMessage extends SvelteComponentDev {\n    \tconstructor(options) {\n    \t\tsuper(options);\n    \t\tinit(this, options, instance$2, create_fragment$2, safe_not_equal, { winner: 0 });\n\n    \t\tdispatch_dev("SvelteRegisterComponent", {\n    \t\t\tcomponent: this,\n    \t\t\ttagName: "WinnerMessage",\n    \t\t\toptions,\n    \t\t\tid: create_fragment$2.name\n    \t\t});\n    \t}\n\n    \tget winner() {\n    \t\tthrow new Error("<WinnerMessage>: Props cannot be read directly from the component instance unless compiling with \'accessors: true\' or \'<svelte:options accessors/>\'");\n    \t}\n\n    \tset winner(value) {\n    \t\tthrow new Error("<WinnerMessage>: Props cannot be set directly on the component instance unless compiling with \'accessors: true\' or \'<svelte:options accessors/>\'");\n    \t}\n    }',
              name: 'WinnerMessage',
            },
          },
          {
            key: 'winningConditions',
            value: [
              [0, 1, 2],
              [3, 4, 5],
              [6, 7, 8],
              [0, 3, 6],
              [1, 4, 7],
              [2, 5, 8],
              [0, 4, 8],
              [2, 4, 6],
            ],
          },
          {
            key: 'state',
            value: [
              ['-', '-', '-'],
              ['-', '-', '-'],
              ['-', '-', '-'],
            ],
          },
          { key: 'turnCount', value: 0 },
          { key: 'turn', value: 'X' },
          { key: 'gameOver', value: false },
          { key: 'winner', value: null },
          {
            key: 'setWinner',
            value: {
              __isFunction: true,
              source:
                'function setWinner(newWinner) {\n    \t\t$$invalidate(3, winner = newWinner);\n    \t}',
              name: 'setWinner',
            },
          },
        ],
      },
    },
  ],
  uniqueId: '292bf162-c56f-4554-ac27-2bb8f21f6c6d',
  detail: {
    attributes: [{ key: 'name', value: 'Tic Tac Toe', isBound: false }],
    listeners: [],
    ctx: [
      {
        key: 'Board',
        value: {
          __isFunction: true,
          source:
            'class Board extends SvelteComponentDev {\n    \tconstructor(options) {\n    \t\tsuper(options);\n    \t\tinit(this, options, instance$1, create_fragment$1, safe_not_equal, { handleClick: 0 });\n\n    \t\tdispatch_dev("SvelteRegisterComponent", {\n    \t\t\tcomponent: this,\n    \t\t\ttagName: "Board",\n    \t\t\toptions,\n    \t\t\tid: create_fragment$1.name\n    \t\t});\n    \t}\n\n    \tget handleClick() {\n    \t\treturn this.$$.ctx[0];\n    \t}\n\n    \tset handleClick(value) {\n    \t\tthrow new Error("<Board>: Props cannot be set directly on the component instance unless compiling with \'accessors: true\' or \'<svelte:options accessors/>\'");\n    \t}\n    }',
          name: 'Board',
        },
      },
      {
        key: 'WinnerMessage',
        value: {
          __isFunction: true,
          source:
            'class WinnerMessage extends SvelteComponentDev {\n    \tconstructor(options) {\n    \t\tsuper(options);\n    \t\tinit(this, options, instance$2, create_fragment$2, safe_not_equal, { winner: 0 });\n\n    \t\tdispatch_dev("SvelteRegisterComponent", {\n    \t\t\tcomponent: this,\n    \t\t\ttagName: "WinnerMessage",\n    \t\t\toptions,\n    \t\t\tid: create_fragment$2.name\n    \t\t});\n    \t}\n\n    \tget winner() {\n    \t\tthrow new Error("<WinnerMessage>: Props cannot be read directly from the component instance unless compiling with \'accessors: true\' or \'<svelte:options accessors/>\'");\n    \t}\n\n    \tset winner(value) {\n    \t\tthrow new Error("<WinnerMessage>: Props cannot be set directly on the component instance unless compiling with \'accessors: true\' or \'<svelte:options accessors/>\'");\n    \t}\n    }',
          name: 'WinnerMessage',
        },
      },
    ],
  },
};

export default mockData;
