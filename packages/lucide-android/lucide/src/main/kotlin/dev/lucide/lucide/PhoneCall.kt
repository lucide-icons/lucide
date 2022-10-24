package dev.lucide.lucide

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.PathFillType
import androidx.compose.ui.graphics.PathFillType.Companion.NonZero
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeCap.Companion.Round
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.ImageVector.Builder
import androidx.compose.ui.graphics.vector.path
import androidx.compose.ui.unit.dp
import dev.lucide.Lucide

public val Lucide.PhoneCall: ImageVector
    get() {
        if (_phoneCall != null) {
            return _phoneCall!!
        }
        _phoneCall = Builder(name = "PhoneCall", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(22.0f, 16.92f)
                verticalLineToRelative(3.0f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, true, -2.18f, 2.0f)
                arcToRelative(19.79f, 19.79f, 0.0f, false, true, -8.63f, -3.07f)
                arcToRelative(19.5f, 19.5f, 0.0f, false, true, -6.0f, -6.0f)
                arcToRelative(19.79f, 19.79f, 0.0f, false, true, -3.07f, -8.67f)
                arcTo(2.0f, 2.0f, 0.0f, false, true, 4.11f, 2.0f)
                horizontalLineToRelative(3.0f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, true, 2.0f, 1.72f)
                arcToRelative(12.84f, 12.84f, 0.0f, false, false, 0.7f, 2.81f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, true, -0.45f, 2.11f)
                lineTo(8.09f, 9.91f)
                arcToRelative(16.0f, 16.0f, 0.0f, false, false, 6.0f, 6.0f)
                lineToRelative(1.27f, -1.27f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, true, 2.11f, -0.45f)
                arcToRelative(12.84f, 12.84f, 0.0f, false, false, 2.81f, 0.7f)
                arcTo(2.0f, 2.0f, 0.0f, false, true, 22.0f, 16.92f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(14.05f, 2.0f)
                arcToRelative(9.0f, 9.0f, 0.0f, false, true, 8.0f, 7.94f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(14.05f, 6.0f)
                arcTo(5.0f, 5.0f, 0.0f, false, true, 18.0f, 10.0f)
            }
        }
        .build()
        return _phoneCall!!
    }

private var _phoneCall: ImageVector? = null
