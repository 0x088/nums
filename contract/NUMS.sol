// SPDX-License-Identifier: MIT
// twitter: 0x088
// web: uniquenums.com

pragma solidity ^0.8.13;

import "base64-sol/base64.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NUMS is ERC721, Ownable, IERC2981 {
    uint8[] private nums;
    uint8 private _totalSupply = 0;
    uint256 private constant BASIS_POINT_DENOMINATOR = 100 * 100;
    uint256 public royalty = 100;

    constructor() ERC721("Unique Nums", "NUMS") Ownable() {
        for (uint8 i = 0; i < 100; i++) {
            if (i == 0 || i == 1 || i == 23 || i == 56 || i == 88) {
                _safeMint(_msgSender(), i);
                _totalSupply = _totalSupply + 1;
            } else {
                nums.push(i);
            }
        }
    }

    function totalSupply() public view returns (uint8) {
        return _totalSupply;
    }

    function availableNums() public view returns (uint8[] memory) {
        return nums;
    }

    function mint() public returns (uint8) {
        require(nums.length != 0, "All tokens were minted");
        require(balanceOf(_msgSender()) == 0, "One token per address");
        uint256 index = uint256(keccak256(abi.encodePacked(block.timestamp))) %
            nums.length;
        uint8 num = nums[index];
        _safeMint(_msgSender(), num);
        _totalSupply = _totalSupply + 1;
        nums[index] = nums[nums.length - 1];
        nums.pop();
        return num;
    }

    function setRoyalties(uint256 _royalty) external onlyOwner {
        require(_royalty <= BASIS_POINT_DENOMINATOR, ">100%");
        royalty = _royalty;
    }

    function royaltyInfo(uint256 _tokenId, uint256 _salePrice)
        external
        view
        override
        returns (address receiver, uint256 royaltyAmount)
    {
        require(0 <= _tokenId && _tokenId < 100, "Token ID invalid");
        return (owner(), (_salePrice * royalty) / 100);
    }

    function render(uint256 _tokenId) internal pure returns (string memory) {
        return
            string.concat(
                '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 220 170">',
                '<style>.num { font-family: "Times New Roman"; font-size: 200px; }</style>',
                '<rect xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="white" />',
                _tokenId < 10
                    ? '<text x="60" y="150" class="num">'
                    : '<text x="10" y="150" class="num">',
                Strings.toString(_tokenId),
                "</text></svg>"
            );
    }

    function tokenURI(uint256 _tokenId)
        public
        pure
        override
        returns (string memory)
    {
        require(0 <= _tokenId && _tokenId < 100, "Token ID invalid");

        string memory svg = string(abi.encodePacked(render(_tokenId)));
        string memory json = Base64.encode(
            abi.encodePacked(
                '{"name": "Num #',
                Strings.toString(_tokenId),
                '", "description": "Unique 100 (0...99) numbers stored on chain", "image": "data:image/svg+xml;base64,',
                Base64.encode(bytes(svg)),
                '"}'
            )
        );

        return string(abi.encodePacked("data:application/json;base64,", json));
    }
}
