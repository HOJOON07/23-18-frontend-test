import { render } from '@testing-library/react';
import { MENU_LIST } from '../../data/MENU_LIST';
import Menu from './Menu';
import { MenuInfo } from './types';

function renderMenu(props?: Partial<MenuInfo>) {
  const DATA = MENU_LIST[0] as Required<MenuInfo>;

  const result = render(<Menu menu={{ ...DATA, ...props }} />);

  const Item = () => result.getByTestId('item');
  const Name = () => result.getByTestId('name');
  const PopularBadge = () => result.queryByTestId('popular');
  const Description = () => result.queryByTestId('description');
  const Prices = () => result.getByTestId('prices');
  const PricesItem = () => result.queryAllByTestId('pricesItem');
  const Tags = () => result.queryByTestId('tags');
  const TagsItem = () => result.queryAllByTestId('tagsItem');
  const Image = () => result.queryByTestId('image');

  return {
    DATA,

    Item,
    Name,
    PopularBadge,
    Description,
    Prices,
    PricesItem,
    Tags,
    TagsItem,
    Image,
  };
}

describe('<Menu />', () => {
  it('처음 렌더링 시 각 요소들이 올바르게 렌더링된다.', () => {
    const { DATA, Item, Name, PopularBadge, Description, Prices, PricesItem, Tags, TagsItem, Image } =
      renderMenu();

    expect(Item()).toBeInTheDocument();
    expect(Name()).toHaveTextContent(DATA.name);
    expect(PopularBadge()).toHaveTextContent('인기');
    expect(Description()).toHaveTextContent(DATA.description);
    expect(PricesItem().length).toBe(DATA.options.length);
    expect(Prices()).toHaveTextContent(
      DATA.options.map(({ name, price }) => `${name && `${name} :`}${price}원`).join(''),
    );
    expect(TagsItem().length).toBe(DATA.tags.length);
    expect(Tags()).toHaveTextContent(DATA.tags.join(''));
    expect(Image()).toHaveAttribute('src', DATA.image);
  });

  it('option의 name 데이터가 없을 경우 해당 부분을 렌더링하지 않는다.', () => {
    const { Prices } = renderMenu({ options: [{ price: '5000' }] });

    expect(Prices()).toHaveTextContent('5000원');
  });

  it('image 데이터가 없을 경우 해당 부분을 렌더링하지 않는다.', () => {
    const { Image } = renderMenu({ image: undefined });

    expect(Image()).not.toBeInTheDocument();
  });

  it('description 데이터가 없을 경우 해당 부분을 렌더링하지 않는다.', () => {
    const { Description } = renderMenu({ description: undefined });

    expect(Description()).not.toBeInTheDocument();
  });

  it('isPopular 데이터가 없을 경우 "인기" 태그가 렌더링되지 않는다.', () => {
    const { PopularBadge } = renderMenu({ isPopular: false });

    expect(PopularBadge()).not.toBeInTheDocument();
  });

  it('tag가 주어지지 않을 경우 렌더링되지 않는다.', () => {
    const { Tags } = renderMenu({ tags: [] });

    expect(Tags()).not.toBeInTheDocument();
  });
});
