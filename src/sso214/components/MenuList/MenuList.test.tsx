import { render } from '@testing-library/react';
import MenuList from './MenuList';
import { MENU_LIST } from '../../data/MENU_LIST';

function renderMenuList() {
  const DATA = MENU_LIST;
  const TITLE = '따끈한 삼첩분식 신상';

  const result = render(<MenuList title={TITLE} menus={DATA} />);

  const Title = () => result.getByTestId('title');
  const List = () => result.queryByTestId('list');
  const ListItems = () => result.queryAllByTestId('item');

  return {
    DATA,
    TITLE,

    Title,
    List,
    ListItems,
  };
}

describe('<MenuList />', () => {
  it('타이틀이 올바르게 렌더링된다.', () => {
    const { Title, TITLE } = renderMenuList();

    expect(Title()).toHaveTextContent(TITLE);
  });

  it('메뉴 아이템들이 올바르게 렌더링된다.', () => {
    const { List, ListItems, DATA } = renderMenuList();

    expect(List()).toBeInTheDocument();
    DATA.forEach(({ name }, index) => {
      expect(ListItems()[index]).toHaveTextContent(name);
    });
    expect(ListItems().length).toBe(DATA.length);
  });
});
