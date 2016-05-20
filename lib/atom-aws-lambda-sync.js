'use babel';

import AtomAwsLambdaSyncView from './atom-aws-lambda-sync-view';
import { CompositeDisposable } from 'atom';

export default {

  atomAwsLambdaSyncView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomAwsLambdaSyncView = new AtomAwsLambdaSyncView(state.atomAwsLambdaSyncViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomAwsLambdaSyncView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-aws-lambda-sync:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomAwsLambdaSyncView.destroy();
  },

  serialize() {
    return {
      atomAwsLambdaSyncViewState: this.atomAwsLambdaSyncView.serialize()
    };
  },

  toggle() {
    console.log('AtomAwsLambdaSync was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
