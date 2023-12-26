import React from 'react';
import { connect } from 'react-redux';
import {
  getCatalogList,
  removeChatFromCatalog,
} from '../../../../store/slices/chatSlice';
import CatalogList from '../CatalogList/CatalogList';
import DialogList from '../../DialogComponents/DialogList/DialogList';

class CatalogListContainer extends React.Component {
  componentDidMount() {
    this.props.getCatalogList();
  }

  removeChatFromCatalog = (event, chatId) => {
    const { id } = this.props.chatStore.currentCatalog;
    this.props.removeChatFromCatalog({ chatId, catalogId: id });
    event.stopPropagation();
  };

  getDialogsPreview = () => {
    const { messagesPreview, currentCatalog } = this.props.chatStore;

    if (!currentCatalog || !currentCatalog.chats) {
      return [];
    }

    const { chats } = currentCatalog;
    const dialogsInCatalog = [];

    for (let i = 0; i < messagesPreview.length; i++) {
      if (messagesPreview[i].id && chats.includes(messagesPreview[i].id)) {
        dialogsInCatalog.push(messagesPreview[i]);
      }
    }

    return dialogsInCatalog;
  };

  render() {
    const { catalogList, isShowChatsInCatalog } = this.props.chatStore;
    const { id } = this.props.userStore.data;
    return (
      <>
        {isShowChatsInCatalog ? (
          <DialogList
            userId={id}
            preview={this.getDialogsPreview()}
            removeChat={this.removeChatFromCatalog}
          />
        ) : (
          <CatalogList catalogList={catalogList} />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { chatStore, userStore } = state;
  return { chatStore, userStore };
};

const mapDispatchToProps = (dispatch) => ({
  getCatalogList: (data) => dispatch(getCatalogList(data)),
  removeChatFromCatalog: (data) => dispatch(removeChatFromCatalog(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CatalogListContainer);
