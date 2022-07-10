# SankakuComplexAddon

- **This extension is currently only works on the English version of the site.**
- *If anyone finds this with an actual developer account feel free to upload it*
- *The post analyzer is work in progress, there is no use to enabling it at the moment*
- *Everything runs locally and no data is send to/received form any 3rd party*

## How to install

- Go to the Extensions Page (chrome://extensions)
- Enable Developer Mode
- Unzip the source code
- Click on 'Load unpacked'
- Select the folder containing the 'manifest.json' file
- Press enter and wait for it to finish loading

## Script Execution Metrics

![msedge_7eMbLYqFmX](https://user-images.githubusercontent.com/89601602/178148002-ff4dfdd5-43f4-4eca-82b9-1035aea506ac.png)

Total: 2.5ms (on average)

## Feature list

```js
// Sankaku Complex Appearance Modifier
// ? Changes the appearance of the site to make it less cluttered.
'scamenabled',
'blockpendingposts',
'blockmailnotice',
'blocktopheader',
'blocksitetitle',
'blocktopnavbar',
'blocksubnavbar',
'modifynavbar',
'blockpreviews',
'clickableimages',
'cursorstyle',
'pageloadoffset',
'pageloadfix',
'betterscrollbar',

// Sankaku Complex Ad Remover
// ? Removes all ads, and refits the page for seamless scrolling.
'scarenabled',
'blocksearchads',
'blocksidebarads',
'blockpopupads',
'blockmediaads',
'blocknewsticker',

// Sankaku Complex Modified Updater
// ? Modifies some updating sections to be more consistent and responsive.
'scmuenabled',
'nofavoritehover',
'customvideovolume',
'pageupdatefix',
'instantimageload',
'customimagehighlights',
'alternatefavorite',
'automutevideo',
'imageloadhook',
'customtaghighlights',
'customthresholds',
'customshortcuts',
'custommodecolors',
'userfollowing',
'tagtracker',

// Sankaku Complex Page Load Optimizer
// ? Allows for infinite scrolling without lag, and improves image loading/scaling.
'scploenabled',
'pagingtargetid',
'pagingawaitid',
'pagingbatchcount',
'maximagesize',
'imageclicksize',
'revertonclick',
'tabopeningmode',
'optimizedpaging',
'alternativeimagescaling',
'preventbackgroundcolorchange',
'downloadmode',
'backgroundmode',

// Sankaku Complex Site Integrations
// ? Integrates with different sites, this is currently just an experiment, although it does function as indented.
'scsienabled',
'rule34pahealdownload',
'rule34xxxdownload',
'rule34pahealintegration',
'rule34xxxintegration',
'chansiteredirect',

// Sankaku Complex Automation Handler
// ? Allows for automation and data collection, this is done locally and is indented for the user, data can be visualized (soon) on the analytics page.
'scahenabled',
'forcethemeenabled',
'forcethemetype',
'automaticlogic',
'automaticloginemail',
'automaticloginpassword',
'postanalyzer',
'postanalyzerdate',
'postanalyzerupdate',
```
