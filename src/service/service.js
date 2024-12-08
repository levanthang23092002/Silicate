require('dotenv').config();
const jwt = require('jsonwebtoken');
const admin = require('../model/connect');
const { formatProductName } = require('../config/covertName');

const User = {

    login: (data, callback) => {
        try {
            const db = admin.database();
            const userRef = db.ref('user');
            userRef
                .once('value')
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const userData = snapshot.val();
                        const userGmail = userData.gmail;
                        const userPass = userData.pass;
                        if (userGmail == null || userPass == null)
                            return callback("lỗi Hệ Thống", null)
                        else
                            if (data[0] == null || data[1] == null)
                                return callback(null, 0)
                            else
                                if (data[0] !== userGmail || data[1] !== userPass)
                                    return callback(null, 1)
                                else {
                                    const user = { gmail: userGmail, pass: userPass };
                                    const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1h' });
                                    console.log(token)
                                    return callback(null, { token, user });
                                }

                    } else {
                        console.log('Không có dữ liệu tại vị trí này.');
                    }
                })
                .catch((error) => {
                    console.error('Kết nối Firebase thất bại: ', error);
                });

        } catch (error) {
            console.log(error);
            callback(error, null);
        }
    },

    addProduct: async (data, callback) => {
        try {
            const productKey = formatProductName(data[0]);
            if (!data[0] || !data[1] || !data[7] || !data[8] || !data[14] || !data[15] || !data[21]) {
                
                callback(null, 2); 
                return;
            }

            const db = admin.database();
            const productRef = db.ref('products/' + productKey);

            // Kiểm tra xem sản phẩm đã tồn tại chưa
            const snapshot = await productRef.once('value');
            if (snapshot.exists()) {
                console.log("Sản phẩm đã tồn tại với khóa:", productKey);
                callback(null, 1); // Trả về mã lỗi 1 nếu sản phẩm đã tồn tại
                return;
            }

            // Dữ liệu sản phẩm cần lưu
            const productData = {
                id: productKey,
                name_vi: data[0],
                description_vi: data[1],
                benefits1_vi: data[2],
                benefits2_vi: data[3],
                benefits3_vi: data[4],
                benefits4_vi: data[5],
                benefits5_vi: data[6],
                name_en: data[7],
                description_en: data[8],
                benefits1_en: data[9],
                benefits2_en: data[10],
                benefits3_en: data[11],
                benefits4_en: data[12],
                benefits5_en: data[13],
                name_zh: data[14],
                description_zh: data[15],
                benefits1_zh: data[16],
                benefits2_zh: data[17],
                benefits3_zh: data[18],
                benefits4_zh: data[19],
                benefits5_zh: data[20],
                image: data[21]
            };
            await productRef.set(productData);
            console.log("Thêm sản phẩm thành công:", productData);
            callback(null, productData);
        } catch (error) {
            console.error("Lỗi khi thêm sản phẩm:", error);
            callback(error, null);
        }
    },

    getListProduct : async (lang, callback) => {
        try {
            const db = admin.database();
            const productsRef = db.ref('products');
            
            // Lấy danh sách sản phẩm
            const snapshot = await productsRef.get();
            
            if (!snapshot.exists()) {
                // Nếu không có sản phẩm nào, trả về 1 để báo không tìm thấy
                callback(null, 1);
            } else {
                const productList = [];
                
                // Lặp qua từng sản phẩm và lấy các trường cần thiết
                snapshot.forEach((childSnapshot) => {
                    const productData = childSnapshot.val();
                    productList.push({
                        id: childSnapshot.key,
                        name: productData[`name_${lang}`] || null,  // Lấy tên theo ngôn ngữ được chọn
                        image: productData.image || null,            // Lấy ảnh nếu có
                    });
                });
    
                callback(null, productList);
            }
        } catch (error) {
            // Trả về lỗi nếu có bất kỳ vấn đề gì trong quá trình lấy dữ liệu
            callback(error, null);
        }
    },
    
   getProduct : async (id, lang, callback) => {
        try {
            const db = admin.database();
            const productRef = db.ref(`products/${id}`);
            const snapshot = await productRef.get();
    
            if (!snapshot.exists()) {
                // Nếu không tìm thấy sản phẩm với ID đó, trả về 1 để báo không tìm thấy
                callback(null, 1);
            } else {
                const productData = snapshot.val();
                const product = {
                    name: productData[`name_${lang}`] || null,
                    description: productData[`description_${lang}`] || null,
                    benefits1: productData[`benefits1_${lang}`] || null,
                    benefits2: productData[`benefits2_${lang}`] || null,
                    benefits3: productData[`benefits3_${lang}`] || null,
                    benefits4: productData[`benefits4_${lang}`] || null,
                    benefits5: productData[`benefits5_${lang}`] || null,
                    image: productData.image || null,
                };
                callback(null, product);
            }
        } catch (error) {
            callback(error, null);
        }
    },
    
    getProductDetail : async (id, callback) => {
        try {
            const db = admin.database();
            const productRef = db.ref(`products/${id}`);
            const snapshot = await productRef.get();
    
            if (!snapshot.exists()) {
                // Nếu không tìm thấy sản phẩm với ID đó, trả về 1 để báo không tìm thấy
                callback(null, 1);
            } else {
                // Lấy dữ liệu sản phẩm từ Firebase
                const productData = snapshot.val();
                callback(null, productData);
            }
        } catch (error) {
            // Trả về lỗi nếu có bất kỳ vấn đề gì trong quá trình lấy dữ liệu
            callback(error, null);
        }
    },
    
    deleteProduct : async (id, callback) => {
        try {
            const db = admin.database();
            const productRef = db.ref(`products/${id}`);
            const snapshot = await productRef.get();
    
            if (!snapshot.exists()) {
                // Nếu không tìm thấy sản phẩm với ID đó, trả về 1 để báo không tìm thấy
                callback(null, 1);
            } else {
                // Xóa sản phẩm khỏi Firebase
                await productRef.remove();
                callback(null, { message: `Product with id ${id} deleted successfully.` });
            }
        } catch (error) {
            // Trả về lỗi nếu có bất kỳ vấn đề gì trong quá trình xóa
            callback(error, null);
        }
    },
    
    updateProduct: async (id, data, callback) => {
        try {
            const db = admin.database();
            const productRef = db.ref(`products/${id}`);
            const snapshot = await productRef.get();
            const newId = formatProductName(data[0]);
            
            if (!snapshot.exists()) {
                callback(null, 1); 
            } else {
                const updatedProductData = {
                    id: newId,
                    name_vi: data[0],
                    description_vi: data[1],
                    benefits1_vi: data[2],
                    benefits2_vi: data[3],
                    benefits3_vi: data[4],
                    benefits4_vi: data[5],
                    benefits5_vi: data[6],
                    name_en: data[7],
                    description_en: data[8],
                    benefits1_en: data[9],
                    benefits2_en: data[10],
                    benefits3_en: data[11],
                    benefits4_en: data[12],
                    benefits5_en: data[13],
                    name_zh: data[14],
                    description_zh: data[15],
                    benefits1_zh: data[16],
                    benefits2_zh: data[17],
                    benefits3_zh: data[18],
                    benefits4_zh: data[19],
                    benefits5_zh: data[20],
                    image: data[21],
                };
                if (id !== newId) {
                    const newProductRef = db.ref(`products/${newId}`);
                    await newProductRef.set(updatedProductData);  
    
                    await productRef.remove();  
                    callback(null, { message: `Product with id ${id} updated successfully to ${newId}.`, data: updatedProductData });
                } else {
                    await productRef.update(updatedProductData);
                    callback(null, { message: `Product with id ${id} updated successfully.`, data: updatedProductData });
                }
            }
        } catch (error) {
            callback(error, null);
        }
    },

    updateLangDefault: async (data, callback) => {
        try {
            const db = admin.database();
            const langRef = db.ref('lang/langdefault');
            await langRef.set(data);
            callback(null,  data);
        } catch (error) {
            callback(error, null);
        }
    },

    getLangDefault: async () => {
        try {
            const db = admin.database();
            const langRef = db.ref('lang/langdefault');

            // Lấy giá trị của langdefault
            const snapshot = await langRef.get();
            if (snapshot.exists()) {
                
                return snapshot.val();
            } else {
                return null;
            }
        } catch (error) {
           return null;
        }
    }
    
    
}

module.exports = User;
