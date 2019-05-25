# pso-tracker

For streamers to have an overlay to show technique disks and other boosters and pickups obtained while playing a [speedrun of Phantasy Star Online](https://www.speedrun.com/pso).
The tracker is currently focused on glitchless runs, where the spellcasting class (Force) relies on finding certain techniques to effectively proceed. Overall, the gameplay varies based on the techniques found, so it is useful for viewers to see the options available to the player.

## Using

Tested with Firefox and Chrome.

Options:
- [Use the tracker online](http://schwjm.me/pso-tracker) (may not be in sync with GitHub commits or releases).
- Download a [release from GitHub](https://github.com/akdb/pso-tracker/releases) and run `dist/index.html`.

## Building from source code

To build your own instance,

1. Install [npm](https://www.npmjs.com/get-npm).
1. Run `npm install --only=production` to download dependencies
1. Run `npm run build` 
1. Load `dist/index.html`

## Developing

Using [parcel](https://parceljs.org/), you can run a local web server and continuously build as files are changed.

1. Run `npm install` to download all dependencies, including devDependencies
1. Run `npm run dev` to start the web server.
1. Run `npm run release` to create a release package.

To get code checked in to this repository, please observe the guidelines in [CONTRIBUTING.md](CONTRIBUTING.md).

## License

Copyright (C) 2019 Justin Schwartz

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a [copy](LICENSE.txt) of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.

### pso-icons

The [pso-icons](https://github.com/akdb/pso-icons) are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-sa/4.0/).
