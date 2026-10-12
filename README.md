# atnnews-layouts

Sample broadcast graphics package for a news program. This is a bundle for
[NodeCG] v1.6 or newer, written with Svelte and TypeScript in 2020.

The bundle contains:
- main layout with a ticker (the text is supplied through a plain-text asset), a
  headline and a nameplate,
- countdown screen,
- Franceinfo-inspired screen for today's headlines.

https://github.com/user-attachments/assets/0097b204-889b-407f-98b2-2a22f16dc2c2

## Installing

The default `dev` branch contains the source code. The compiled, ready-to-use
files are located on the `master` branch. Therefore, you need to clone the
repository into the `bundles` folder with the following command:

```shell
git clone https://github.com/kotwys/atnnews-layouts -b master
```

Also, the graphics are relying on the following fonts that **are not** provided
with this repository:

- Roboto Slab,
- Open Sans,
- Material Icons ([the old one][material-icons]).

## Assets

The ticker asset expects a .txt UTF-8 file, where each headline is separated by
a newline character. The headlines are looped.

[NodeCG]: https://nodecg.com
[material-icons]: https://github.com/google/material-design-icons/blob/master/font/MaterialIcons-Regular.ttf
