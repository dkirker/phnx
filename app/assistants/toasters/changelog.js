var ChangelogToaster = Class.create(Toaster, {
	items: [
		{ version: '1.2.24' },
		{ item: 'Display both the twitter screen name and display name in the timeline' },

		{ version: '1.2.22' },
		{ item: 'Added option to ask the user what to do when a link is clicked on. Option can be enabled in preferences, or by long pressing a URL when viewing a tweet.' },
		{ item: 'Corrected behavior when clicking on "Tweets" when viewing a user profile' },
		{ item: 'Remove the close button when viewing a profile on a device with a gesture area to ensure that the menu button remains visible.' },

		{ version: '1.2.20' },
		{ item: 'ReadItLater and Instapaper support'},
		{ item: 'Top bar in the preferences scene is now static'},
		{ item: 'Call the app controller to handle links instead of sending them to the stock browser. This works for if you have a different default browser then the stock browser.'},

		{ version: '1.2.18' },
		{ item: 'Added help scene' },
		{ item: 'Use HTTPS for all twitter access' },
		{ item: 'Updated the finished authentiation scene layout' },
		{ item: 'Added preference for using the in-app browser or the stock browser' },

		{ version: '1.2.17' },
		{ item: 'Added a changelog' },
		{ item:	'Disable the post button while posting a tweet' },
		{ item:	'Added an "automatic" mode for the card icon feature' },

		{ version: '1.2.16' },
		{ item:	'Added filters (Select "Manage Filters" from the app menu)' },
		{ item:	'Include RTs in the timeline' },
		{ item:	'Use "Pure" as the default theme' },
		{ item:	'Show recipient name on sent DMs' },
		{ item:	'Allow deleting sent DMs' },

		{ version: '1.2.15' },
		{ item:	'Improved column layout on the TouchPad' },
		{ item:	'Added support for sending notifications to the MW150 bluetooth watch (Thanks @linuxq)' },
		{ item:	'Fixed a bug that would cause a RT to be displayed in the timeline twice in some situations' },
		{ item:	'Hide a tweet after blocking or reporting spam' },
		{ item:	'Display sent DMs' }
	],

	initialize: function(assistant) {
		this.id = toasterIndex++;
		this.nodeId = 'toaster-' + this.id;
		this.visible = false;
		this.shim = true;

		this.assistant = assistant;
		this.controller = getController();
		this.user = this.controller.stageController.user;

		this.render({'toasterId':this.id}, 'templates/toasters/changelog');

		this.controller.setupWidget('convo-scroller-' + this.id, {mode: 'vertical'},{});
		this.controller.setupWidget('convo-list-' + this.id,
		{
			itemTemplate:		"templates/changelog-item",
			listTemplate:		"templates/list"
		}, this);
	},
	backTapped: function(event) {
		this.assistant.toasters.back();
	},
	setup: function() {
		this.controller.instantiateChildWidgets(get('toasters'));

		var screenHeight = this.controller.window.innerHeight;
		get('convo-scroller-' + this.id).setStyle({'max-height': (screenHeight - 85) + 'px'});
		get(this.nodeId).setStyle({'max-height': (screenHeight - 65) + 'px'});

		Mojo.Event.listen(this.controller.get('back-' + this.id), Mojo.Event.tap, this.backTapped.bind(this));
	},
	cleanup: function() {
		Mojo.Event.stopListening(this.controller.get('back-' + this.id), Mojo.Event.tap, this.backTapped);
	}
});

