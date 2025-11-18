CREATE DATABASE IF NOT EXISTS guuds CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE guuds;

-- Admin (req)
CREATE TABLE `Admin` (
    AdminID INT PRIMARY KEY AUTO_INCREMENT,
    AdminFname VARCHAR(50),
    AdminLname VARCHAR(50),
    AdminEmail VARCHAR(50) NOT NULL UNIQUE,
    AdminPhoneNumber VARCHAR(20),
    AdminUsername VARCHAR(100) NOT NULL UNIQUE,
    AdminPassword VARCHAR(255) NOT NULL,
    AdminCreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    AdminLastLogin DATETIME,
    INDEX idx_admin_username (AdminUsername),
    INDEX idx_admin_email (AdminEmail)
) ENGINE=InnoDB;

CREATE TABLE `User` (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    UserFname VARCHAR(50),
    UserLname VARCHAR(50),
    Username VARCHAR(50) NOT NULL UNIQUE,
    UserEmail VARCHAR(100) NOT NULL UNIQUE,
    UserPhoneNumber VARCHAR(20),
    UserPassword VARCHAR(255) NOT NULL,
    UserA_Street VARCHAR(50),
    UserA_City VARCHAR(50),
    UserA_Province VARCHAR(50),
    UserA_Country VARCHAR(50),
    UserA_PostalCode VARCHAR(20),
    UserDOB DATE,
    UserRegisterDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UserS_Active BOOLEAN DEFAULT TRUE,
    UserS_Suspended BOOLEAN DEFAULT FALSE,
    INDEX idx_username (Username),
    INDEX idx_user_email (UserEmail)
) ENGINE=InnoDB;

-- Login (req)
CREATE TABLE Login (
    LogID INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(100) NOT NULL,
    UserType ENUM('Admin', 'User', 'Store') NOT NULL,
    LoginTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    LoginStatus ENUM('Success', 'Failed') NOT NULL,
    IPAddress VARCHAR(45),
    UserAgent VARCHAR(255),
    INDEX idx_username_log (Username),
    INDEX idx_login_time (LoginTime)
) ENGINE=InnoDB;

CREATE TABLE OfficialStore (
    StoreID INT PRIMARY KEY AUTO_INCREMENT,
    StoreName VARCHAR(50) NOT NULL,
    StoreDescription VARCHAR(250),
    StoreEmail VARCHAR(100) NOT NULL UNIQUE,
    StorePhoneNumber VARCHAR(20) NOT NULL,
    StoreUsername VARCHAR(100) NOT NULL UNIQUE,
    StorePassword VARCHAR(255) NOT NULL,
    StoreBusinessLicenseNumber VARCHAR(100) NOT NULL UNIQUE,
    StoreA_Street VARCHAR(50),
    StoreA_City VARCHAR(50),
    StoreA_Province VARCHAR(50),
    StoreA_Country VARCHAR(50),
    StoreA_PostalCode VARCHAR(20),
    StoreCreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_store_name (StoreName)
) ENGINE=InnoDB;

CREATE TABLE Community (
    CommunityID INT PRIMARY KEY AUTO_INCREMENT,
    CommunityName VARCHAR(100) NOT NULL UNIQUE,
    CommunityDescription VARCHAR(250),
    CommunityRules VARCHAR(200),
    CommunityCreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_community_name (CommunityName)
) ENGINE=InnoDB;

-- Junction table: User & Community (M-to-N)
CREATE TABLE UserCommunity (
    UserCommunityID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT NOT NULL,
    CommunityID INT NOT NULL,
    JoinDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UserRole ENUM('Member', 'Moderator', 'Admin') DEFAULT 'Member',
    IsActive BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE,
    FOREIGN KEY (CommunityID) REFERENCES Community(CommunityID) ON DELETE CASCADE,
    UNIQUE KEY unique_user_community (UserID, CommunityID),
    INDEX idx_user (UserID),
    INDEX idx_community (CommunityID)
) ENGINE=InnoDB;

CREATE TABLE Category (
    CategoryID INT PRIMARY KEY AUTO_INCREMENT,
    CategoryName VARCHAR(50) NOT NULL UNIQUE,
    CategoryDescription VARCHAR(100),
    INDEX idx_category_name (CategoryName)
) ENGINE=InnoDB;

-- Product (req)
CREATE TABLE Product (
    ProductID INT PRIMARY KEY AUTO_INCREMENT,
    ProductName VARCHAR(150) NOT NULL,
    ProductDescription VARCHAR(250),
    ProductImage VARCHAR(250),
    ProductPrice DECIMAL(10,2) NOT NULL CHECK (ProductPrice >= 0),
    ProductStock_Quantity INT NOT NULL DEFAULT 0 CHECK (ProductStock_Quantity >= 0),
    ProductS_Available BOOLEAN DEFAULT TRUE,
    ProductS_OutOfStock BOOLEAN DEFAULT FALSE,
    StoreID INT,
    CategoryID INT,
    ProductCreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    ProductUpdatedDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (StoreID) REFERENCES OfficialStore(StoreID) ON DELETE SET NULL,
    FOREIGN KEY (CategoryID) REFERENCES Category(CategoryID) ON DELETE SET NULL,
    INDEX idx_product_name (ProductName),
    INDEX idx_product_price (ProductPrice),
    INDEX idx_store (StoreID),
    INDEX idx_category (CategoryID)
) ENGINE=InnoDB;

CREATE TABLE Review (
    ReviewID INT PRIMARY KEY AUTO_INCREMENT,
    ReviewProductID INT NOT NULL,
    ReviewUserID INT NOT NULL,
    ReviewRating INT CHECK (ReviewRating >= 1 AND ReviewRating <= 5),
    ReviewComment VARCHAR(100),
    ReviewDate DATE DEFAULT (CURRENT_DATE),
    FOREIGN KEY (ReviewProductID) REFERENCES Product(ProductID) ON DELETE CASCADE,
    FOREIGN KEY (ReviewUserID) REFERENCES User(UserID) ON DELETE CASCADE,
    INDEX idx_product_review (ReviewProductID),
    INDEX idx_user_review (ReviewUserID),
    UNIQUE KEY unique_user_product_review (ReviewUserID, ReviewProductID)
) ENGINE=InnoDB;

CREATE TABLE Cart (
    CartID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT NOT NULL UNIQUE,
    CartS_Active BOOLEAN DEFAULT TRUE,
    CartS_Empty BOOLEAN DEFAULT TRUE,
    CartCreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    CartUpdatedDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE,
    INDEX idx_user_cart (UserID)
) ENGINE=InnoDB;

-- Jumction Table: Cart & Product (M-to-N)
CREATE TABLE CartItem (
    CartItemID INT PRIMARY KEY AUTO_INCREMENT,
    CartID INT NOT NULL,
    ProductID INT NOT NULL,
    CartItemQuantity INT NOT NULL DEFAULT 1 CHECK (CartItemQuantity >= 1),
    AddedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (CartID) REFERENCES Cart(CartID) ON DELETE CASCADE,
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID) ON DELETE CASCADE,
    UNIQUE KEY unique_cart_product (CartID, ProductID),
    INDEX idx_cart_items (CartID),
    INDEX idx_product_items (ProductID)
) ENGINE=InnoDB;

CREATE TABLE `Order` (
    OrderID INT PRIMARY KEY AUTO_INCREMENT,
    OrderUserID INT NOT NULL,
    OrderDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    OrderShippedDate DATETIME,
    OrderTotalAmount DECIMAL(10,2) NOT NULL CHECK (OrderTotalAmount >= 0),
    OrderShip_Street VARCHAR(50) NOT NULL,
    OrderShip_City VARCHAR(50) NOT NULL,
    OrderShip_Province VARCHAR(50) NOT NULL,
    OrderShip_Country VARCHAR(50) NOT NULL,
    OrderShip_PostalCode VARCHAR(50) NOT NULL,
    OrderS_New BOOLEAN DEFAULT TRUE,
    OrderS_Processing BOOLEAN DEFAULT FALSE,
    OrderS_Shipped BOOLEAN DEFAULT FALSE,
    OrderS_Completed BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (OrderUserID) REFERENCES User(UserID) ON DELETE RESTRICT,
    INDEX idx_user_order (OrderUserID),
    INDEX idx_order_date (OrderDate)
) ENGINE=InnoDB;

-- Junction Table: Order & Product (M-to-N)
CREATE TABLE OrderItem (
    OrderItemID INT PRIMARY KEY AUTO_INCREMENT,
    OrderID INT NOT NULL,
    ProductID INT NOT NULL,
    OrderItemQuantity INT NOT NULL CHECK (OrderItemQuantity > 0),
    OrderItemPrice DECIMAL(10,2) NOT NULL CHECK (OrderItemPrice >= 0),
    FOREIGN KEY (OrderID) REFERENCES `Order`(OrderID) ON DELETE CASCADE,
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID) ON DELETE RESTRICT,
    INDEX idx_order_items (OrderID),
    INDEX idx_product_orders (ProductID),
    UNIQUE KEY unique_order_product (OrderID, ProductID)
) ENGINE=InnoDB;

CREATE TABLE Payment (
    PaymentID INT PRIMARY KEY AUTO_INCREMENT,
    PaymentOrderID INT NOT NULL UNIQUE,
    PaymentDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    PaymentAmount DECIMAL(10,2) NOT NULL CHECK (PaymentAmount >= 0),
    PaymentMethod ENUM('Credit Card', 'QR', 'Bank Transfer') NOT NULL,
    PaymentS_Pending BOOLEAN DEFAULT TRUE,
    PaymentS_Paid BOOLEAN DEFAULT FALSE,
    PaymentTransactionID VARCHAR(100),
    FOREIGN KEY (PaymentOrderID) REFERENCES `Order`(OrderID) ON DELETE RESTRICT,
    INDEX idx_payment_order (PaymentOrderID),
    INDEX idx_payment_date (PaymentDate)
) ENGINE=InnoDB;


-- VIEW ZONE (for often use data)

-- Product "Description", "Rating", and "Category"
CREATE VIEW vw_ProductRating AS
SELECT 
    p.ProductID,
    p.ProductName,
    p.ProductDescription,
    p.ProductImage,
    p.ProductPrice,
    p.ProductStock_Quantity,
    p.ProductS_Available,
    COUNT(r.ReviewID) AS ReviewCount,
    COALESCE(AVG(r.ReviewRating), 0) AS AvgRating,
    s.StoreName,
    c.CategoryName
FROM Product p
LEFT JOIN Review r ON p.ProductID = r.ReviewProductID
LEFT JOIN OfficialStore s ON p.StoreID = s.StoreID
LEFT JOIN Category c ON p.CategoryID = c.CategoryID
GROUP BY p.ProductID;

-- Order History
CREATE VIEW vw_UserOrderHistory AS
SELECT 
    o.OrderID,
    o.OrderDate,
    o.OrderShippedDate,
    u.UserID,
    u.Username,
    u.UserEmail,
    o.OrderTotalAmount,
    CASE 
        WHEN o.OrderS_Completed THEN 'Completed'
        WHEN o.OrderS_Shipped THEN 'Shipped'
        WHEN o.OrderS_Processing THEN 'Processing'
        WHEN o.OrderS_New THEN 'New'
        ELSE 'Unknown'
    END AS OrderStatus,
    p.PaymentMethod,
    p.PaymentS_Paid
FROM `Order` o
JOIN `User` u ON o.OrderUserID = u.UserID
LEFT JOIN Payment p ON o.OrderID = p.PaymentOrderID;

-- Community Mem(N)
CREATE VIEW vw_CommunityMembers AS
SELECT 
    c.CommunityID,
    c.CommunityName,
    c.CommunityDescription,
    c.CommunityRules,
    COUNT(uc.UserID) AS ActualMemberCount,
    c.CommunityCreatedDate
FROM Community c
LEFT JOIN UserCommunity uc ON c.CommunityID = uc.CommunityID 
    AND uc.IsActive = TRUE
GROUP BY c.CommunityID;

-- All Items In User Cart
CREATE VIEW vw_UserCart AS
SELECT 
    c.CartID,
    c.UserID,
    u.Username,
    ci.ProductID,
    p.ProductName,
    p.ProductPrice,
    ci.CartItemQuantity,
    (p.ProductPrice * ci.CartItemQuantity) AS ItemTotal,
    p.ProductS_Available
FROM Cart c
JOIN User u ON c.UserID = u.UserID
LEFT JOIN CartItem ci ON c.CartID = ci.CartID
LEFT JOIN Product p ON ci.ProductID = p.ProductID
WHERE c.CartS_Active = TRUE;


-- TRIGGER ZONE (for auto insert, update, delete data)

DELIMITER //
DROP TRIGGER IF EXISTS trg_UpdateCartStatus_Insert;//
DROP TRIGGER IF EXISTS trg_UpdateCartStatus_Delete;//
DROP TRIGGER IF EXISTS trg_UpdateAdminLastLogin;//

-- Update Cart Status When Adding New Item(s)
CREATE TRIGGER trg_UpdateCartStatus_Insert
AFTER INSERT ON CartItem
FOR EACH ROW
BEGIN
	IF NEW.CartItemQuantity IS NOT NULL AND NEW.CartItemQuantity > 0 THEN
		UPDATE Cart
		SET CartS_Empty = FALSE,
			CartUpdatedDate = CURRENT_TIMESTAMP
		WHERE CartID = NEW.CartID;
	END IF;
END //

-- Update Cart Status When Deleting a(n) Item(s)
CREATE TRIGGER trg_UpdateCartStatus_Delete
AFTER DELETE ON CartItem
FOR EACH ROW
BEGIN
    DECLARE item_count INT;
    SELECT COUNT(*) INTO item_count
    FROM CartItem
    WHERE CartID = OLD.CartID;
    UPDATE Cart
    SET CartS_Empty = IF(item_count = 0, TRUE, FALSE),
        CartUpdatedDate = CURRENT_TIMESTAMP
    WHERE CartID = OLD.CartID;
END //

-- Update Admin Last Login
CREATE TRIGGER trg_UpdateAdminLastLogin
AFTER INSERT ON Login
FOR EACH ROW
BEGIN
    IF NEW.UserType = 'Admin' AND NEW.LoginStatus = 'Success' THEN
        UPDATE `Admin`
        SET AdminLastLogin = NEW.LoginTime
        WHERE AdminUsername = NEW.Username;
    END IF;
END //

DELIMITER ;